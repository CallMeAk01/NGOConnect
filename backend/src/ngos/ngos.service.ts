import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryNgosDto } from './dto/query-ngos.dto';

function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * rad) * Math.cos(lat2 * rad) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

@Injectable()
export class NgosService {
    constructor(private readonly prisma: PrismaService) { }

    // ─── Find NGOs (with optional geospatial filtering) ────────────────
    async findNgos(query: QueryNgosDto) {
        const { latitude, longitude, radiusKm, page, limit } = query;

        // If geospatial filtering is requested, use PostGIS raw SQL
        if (
            latitude !== undefined &&
            longitude !== undefined &&
            radiusKm !== undefined
        ) {
            return this.findNgosWithinRadius(
                latitude,
                longitude,
                radiusKm,
                page || 1,
                limit || 20,
            );
        }

        // Standard query — all verified NGOs
        const [ngos, total] = await Promise.all([
            this.prisma.nGOProfile.findMany({
                include: {
                    user: { select: { id: true, email: true, isVerified: true } },
                },
                orderBy: { rating: 'desc' },
                skip: ((page || 1) - 1) * (limit || 20),
                take: limit || 20,
            }),
            this.prisma.nGOProfile.count(),
        ]);

        return {
            data: ngos,
            meta: {
                total,
                page: page || 1,
                limit: limit || 20,
                totalPages: Math.ceil(total / (limit || 20)),
            },
        };
    }

    // ─── PostGIS: NGOs within radius ──────────────────────────────────
    private async findNgosWithinRadius(
        lat: number,
        lng: number,
        radiusKm: number,
        page: number,
        limit: number,
    ) {
        const radiusMeters = radiusKm * 1000;
        const offset = (page - 1) * limit;

        const allNgos = await this.prisma.nGOProfile.findMany({
            include: { user: { select: { id: true, email: true, isVerified: true } } }
        });

        const withDist = allNgos.map(n => ({
            ...n,
            distance_meters: getDistanceMeters(lat, lng, n.latitude, n.longitude)
        })).filter(n => n.distance_meters <= radiusMeters)
            .sort((a, b) => a.distance_meters - b.distance_meters);

        const total = withDist.length;
        const paginated = withDist.slice(offset, offset + limit);

        return {
            data: paginated,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                searchCenter: { latitude: lat, longitude: lng },
                radiusKm,
            },
        };
    }

    // ─── Impact Metrics ───────────────────────────────────────────────
    async getImpactMetrics(ngoId: string) {
        const ngo = await this.prisma.nGOProfile.findUnique({
            where: { id: ngoId },
            include: {
                user: { select: { id: true, email: true } },
            },
        });

        if (!ngo) {
            throw new NotFoundException(`NGO with ID ${ngoId} not found`);
        }

        // Calculate metrics from assigned cases
        const [totalCases, resolvedCases, inProgressCases, openCases] =
            await Promise.all([
                this.prisma.case.count({
                    where: { assignedNgoId: ngoId },
                }),
                this.prisma.case.count({
                    where: { assignedNgoId: ngoId, status: 'RESOLVED' },
                }),
                this.prisma.case.count({
                    where: { assignedNgoId: ngoId, status: 'IN_PROGRESS' },
                }),
                this.prisma.case.count({
                    where: { assignedNgoId: ngoId, status: 'OPEN' },
                }),
            ]);

        // Calculate total donations received for this NGO's cases
        const donationResult = await this.prisma.donation.aggregate({
            _sum: { amount: true },
            where: {
                case: { assignedNgoId: ngoId },
            },
        });

        const successRate =
            totalCases > 0
                ? Math.round((resolvedCases / totalCases) * 100 * 100) / 100
                : 0;

        return {
            ngo: {
                id: ngo.id,
                orgName: ngo.orgName,
                rating: ngo.rating,
                verificationStatus: ngo.verificationStatus,
            },
            metrics: {
                totalRescues: totalCases,
                resolvedCases,
                inProgressCases,
                openCases,
                successRate,
                totalDonationsReceived: donationResult._sum.amount || 0,
            },
        };
    }

    // ─── Verify NGO ───────────────────────────────────────────────────
    async verifyNgo(ngoId: string) {
        const ngo = await this.prisma.nGOProfile.findUnique({
            where: { id: ngoId },
        });

        if (!ngo) {
            throw new NotFoundException(`NGO with ID ${ngoId} not found`);
        }

        const updatedNgo = await this.prisma.nGOProfile.update({
            where: { id: ngoId },
            data: { verificationStatus: true },
        });

        await this.prisma.user.update({
            where: { id: ngo.userId },
            data: { isVerified: true },
        });

        return {
            message: 'NGO verified successfully',
            ngo: updatedNgo,
        };
    }

    // ─── Credibility Score ────────────────────────────────────────────
    async calculateCredibilityScore(ngoId: string) {
        const ngo = await this.prisma.nGOProfile.findUnique({
            where: { id: ngoId },
        });

        if (!ngo) {
            throw new NotFoundException(`NGO with ID ${ngoId} not found`);
        }

        // 1. Success Rate (30%) — resolved / total assigned
        const [totalCases, resolvedCases] = await Promise.all([
            this.prisma.case.count({ where: { assignedNgoId: ngoId } }),
            this.prisma.case.count({ where: { assignedNgoId: ngoId, status: 'RESOLVED' } }),
        ]);
        const successRate = totalCases > 0 ? (resolvedCases / totalCases) * 100 : 50;

        // 2. Response Speed (35%) — avg time from case creation to first activity log
        let responseSpeedScore = 70; // default if no data
        if (totalCases > 0) {
            const assignedCases = await this.prisma.case.findMany({
                where: { assignedNgoId: ngoId },
                select: { id: true, createdAt: true },
                take: 20,
                orderBy: { createdAt: 'desc' },
            });

            let totalResponseMinutes = 0;
            let respondedCount = 0;

            for (const c of assignedCases) {
                const firstLog = await this.prisma.activityLog.findFirst({
                    where: { caseId: c.id },
                    orderBy: { timestamp: 'asc' },
                });
                if (firstLog) {
                    const diffMs = firstLog.timestamp.getTime() - c.createdAt.getTime();
                    totalResponseMinutes += diffMs / (1000 * 60);
                    respondedCount++;
                }
            }

            if (respondedCount > 0) {
                const avgMinutes = totalResponseMinutes / respondedCount;
                // Under 30 min = 100, 30-60 = 80, 60-120 = 60, > 120 = 40
                if (avgMinutes <= 30) responseSpeedScore = 95;
                else if (avgMinutes <= 60) responseSpeedScore = 80;
                else if (avgMinutes <= 120) responseSpeedScore = 60;
                else responseSpeedScore = 40;
            }
        }

        // 3. Transparency (20%) — cases with financial records / total cases
        let transparencyScore = 50;
        if (totalCases > 0) {
            const casesWithDonations = await this.prisma.donation.groupBy({
                by: ['caseId'],
                where: {
                    case: { assignedNgoId: ngoId },
                },
            });
            transparencyScore = Math.min(100, (casesWithDonations.length / totalCases) * 100);
        }

        // 4. Community Rating (15%) — rating field (0-5 scaled to 0-100)
        const communityScore = (ngo.rating / 5) * 100;

        // Weighted composite
        const overallScore = Math.round(
            (responseSpeedScore * 0.35) +
            (successRate * 0.30) +
            (transparencyScore * 0.20) +
            (communityScore * 0.15)
        );

        const grade = overallScore >= 80 ? 'Excellent' : overallScore >= 60 ? 'Good' : 'Developing';

        return {
            ngoId,
            orgName: ngo.orgName,
            overallScore: Math.min(100, overallScore),
            grade,
            breakdown: {
                responseSpeed: { score: Math.round(responseSpeedScore), weight: '35%', label: 'Response Speed' },
                successRate: { score: Math.round(successRate), weight: '30%', label: 'Success Rate' },
                transparency: { score: Math.round(transparencyScore), weight: '20%', label: 'Transparency' },
                communityRating: { score: Math.round(communityScore), weight: '15%', label: 'Community Rating' },
            },
        };
    }
}

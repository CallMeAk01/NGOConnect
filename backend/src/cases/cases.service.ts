import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventsGateway } from '../events/events.gateway';
import { CreateCaseDto } from './dto/create-case.dto';
import { QueryCasesDto } from './dto/query-cases.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';

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
export class CasesService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly eventsGateway: EventsGateway,
    ) { }

    // ─── Create Case ───────────────────────────────────────────────────
    async createCase(dto: CreateCaseDto, reporterId?: string) {
        // 1. Location-Based Matching: Find nearby verified NGOs (e.g., within 50km)
        const radiusMeters = 50 * 1000;
        let assignedNgoId = null;
        let nearbyNgos: any[] = [];

        try {
            const allNgos = await this.prisma.nGOProfile.findMany({ where: { verificationStatus: true } });
            const withDist = allNgos.map(n => ({
                id: n.id,
                userId: n.userId,
                orgName: n.orgName,
                distance_meters: getDistanceMeters(dto.latitude, dto.longitude, n.latitude, n.longitude)
            })).filter(n => n.distance_meters <= radiusMeters)
                .sort((a, b) => a.distance_meters - b.distance_meters);

            if (withDist.length > 0) {
                nearbyNgos = withDist.slice(0, 5);
                if (dto.urgency === 'CRITICAL') {
                    assignedNgoId = nearbyNgos[0].id;
                }
            }
        } catch (error) {
            // Fallback in case PostGIS extension / location columns aren't robustly initialized
            console.error('Failed to query nearby NGOs:', error);
        }

        // 3. Create Case
        const newCase = await this.prisma.case.create({
            data: {
                reporterId: reporterId || null,
                assignedNgoId: assignedNgoId,
                latitude: dto.latitude,
                longitude: dto.longitude,
                urgency: dto.urgency,
                description: dto.description,
                images: JSON.stringify(dto.images || []),
            },
            include: {
                reporter: {
                    select: { id: true, email: true, role: true },
                },
                assignedNgo: {
                    select: { id: true, orgName: true },
                }
            },
        });

        // Log creation in ActivityLog
        if (reporterId) {
            await this.prisma.activityLog.create({
                data: {
                    caseId: newCase.id,
                    actorId: reporterId,
                    actionType: 'CASE_CREATED',
                    metadata: JSON.stringify({
                        urgency: dto.urgency,
                        latitude: dto.latitude,
                        longitude: dto.longitude,
                        autoAssignedTo: assignedNgoId
                    }),
                },
            });
        }

        // Emit WebSocket event
        this.eventsGateway.emitCaseCreated(newCase);

        // 4. Emit Real-Time Critical Alert if applicable
        if (dto.urgency === 'CRITICAL') {
            this.eventsGateway.emitCriticalCaseAlert(newCase, nearbyNgos);
        }

        return newCase;
    }

    // ─── Query Cases (with optional geospatial sorting) ────────────────
    async findCases(query: QueryCasesDto) {
        const { status, urgency, dateFrom, dateTo, latitude, longitude, radiusKm, page, limit } = query;

        // If geospatial filtering is requested, use raw SQL with PostGIS
        if (latitude !== undefined && longitude !== undefined && radiusKm) {
            return this.findCasesWithinRadius(latitude, longitude, radiusKm, {
                status,
                urgency,
                dateFrom,
                dateTo,
                page: page || 1,
                limit: limit || 20,
            });
        }

        // Standard Prisma query with filters
        const where: any = {};

        if (status) where.status = status;
        if (urgency) where.urgency = urgency;
        if (dateFrom || dateTo) {
            where.createdAt = {};
            if (dateFrom) where.createdAt.gte = new Date(dateFrom);
            if (dateTo) where.createdAt.lte = new Date(dateTo);
        }

        const [cases, total] = await Promise.all([
            this.prisma.case.findMany({
                where,
                include: {
                    reporter: { select: { id: true, email: true, role: true } },
                    assignedNgo: { select: { id: true, orgName: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip: ((page || 1) - 1) * (limit || 20),
                take: limit || 20,
            }),
            this.prisma.case.count({ where }),
        ]);

        return {
            data: cases,
            meta: {
                total,
                page: page || 1,
                limit: limit || 20,
                totalPages: Math.ceil(total / (limit || 20)),
            },
        };
    }

    // ─── Geospatial Query: Cases within X km ──────────────────────────
    private async findCasesWithinRadius(
        lat: number,
        lng: number,
        radiusKm: number,
        filters: {
            status?: string;
            urgency?: string;
            dateFrom?: string;
            dateTo?: string;
            page: number;
            limit: number;
        },
    ) {
        const radiusMeters = radiusKm * 1000;
        const offset = (filters.page - 1) * filters.limit;

        const where: any = {};
        if (filters.status) where.status = filters.status;
        if (filters.urgency) where.urgency = filters.urgency;
        if (filters.dateFrom || filters.dateTo) {
            where.createdAt = {};
            if (filters.dateFrom) where.createdAt.gte = new Date(filters.dateFrom);
            if (filters.dateTo) where.createdAt.lte = new Date(filters.dateTo);
        }

        const allCases = await this.prisma.case.findMany({ where });
        const withDist = allCases.map(c => ({
            ...c,
            distance_meters: getDistanceMeters(lat, lng, c.latitude, c.longitude)
        })).filter(c => c.distance_meters <= radiusMeters)
            .sort((a, b) => a.distance_meters - b.distance_meters);

        const total = withDist.length;
        const paginated = withDist.slice(offset, offset + filters.limit);

        return {
            data: paginated,
            meta: {
                total,
                page: filters.page,
                limit: filters.limit,
                totalPages: Math.ceil(total / filters.limit),
                searchCenter: { latitude: lat, longitude: lng },
                radiusKm,
            },
        };
    }

    // ─── Update Case Status ───────────────────────────────────────────
    async updateCaseStatus(
        caseId: string,
        dto: UpdateCaseStatusDto,
        actorId: string,
        actorRole: string,
    ) {
        // Verify case exists
        const existingCase = await this.prisma.case.findUnique({
            where: { id: caseId },
            include: {
                assignedNgo: true,
            }
        });

        if (!existingCase) {
            throw new NotFoundException(`Case with ID ${caseId} not found`);
        }

        // --- RBAC CHECKS ---
        if (actorRole === 'REPORTER') {
            if (existingCase.reporterId !== actorId) {
                throw new ForbiddenException('You do not have permission to modify this case');
            }
        } else if (actorRole === 'NGO') {
            if (!existingCase.assignedNgo || existingCase.assignedNgo.userId !== actorId) {
                throw new ForbiddenException('You can only update cases assigned to your NGO');
            }
        } else if (actorRole !== 'ADMIN') {
            throw new ForbiddenException('You do not have permission to modify this case');
        }

        const previousStatus = existingCase.status;

        // Update case
        const updatedCase = await this.prisma.case.update({
            where: { id: caseId },
            data: { status: dto.status },
            include: {
                reporter: { select: { id: true, email: true, role: true } },
                assignedNgo: { select: { id: true, orgName: true } },
            },
        });

        // Append to ActivityLog (immutable audit trail)
        await this.prisma.activityLog.create({
            data: {
                caseId: caseId,
                actorId: actorId,
                actionType: 'STATUS_CHANGE',
                metadata: JSON.stringify({
                    previousStatus,
                    newStatus: dto.status,
                    changedAt: new Date().toISOString(),
                }),
            },
        });

        // Emit WebSocket event for real-time update
        this.eventsGateway.emitCaseStatusUpdate({
            caseId: updatedCase.id,
            previousStatus,
            newStatus: dto.status,
            updatedBy: actorId,
            updatedAt: updatedCase.updatedAt.toISOString(),
        });

        return updatedCase;
    }

    // ─── Get Case by ID ───────────────────────────────────────────────
    async findCaseById(caseId: string) {
        const rescueCase = await this.prisma.case.findUnique({
            where: { id: caseId },
            include: {
                reporter: { select: { id: true, email: true, role: true } },
                assignedNgo: { select: { id: true, orgName: true } },
                activityLogs: {
                    orderBy: { timestamp: 'asc' },
                    include: {
                        actor: { select: { id: true, email: true, role: true } },
                    },
                },
            },
        });

        if (!rescueCase) {
            throw new NotFoundException(`Case with ID ${caseId} not found`);
        }

        return rescueCase;
    }

    // ─── Auto-Escalation Check ────────────────────────────────────────
    async checkAndEscalate() {
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        // Find CRITICAL or IN_PROGRESS cases assigned to an NGO
        // that have no activity log in the last 30 minutes
        const staleCases = await this.prisma.case.findMany({
            where: {
                urgency: 'CRITICAL',
                status: { in: ['OPEN', 'IN_PROGRESS'] },
                assignedNgoId: { not: null },
            },
            include: {
                assignedNgo: true,
                activityLogs: {
                    orderBy: { timestamp: 'desc' },
                    take: 1,
                },
            },
        });

        let escalatedCount = 0;

        for (const c of staleCases) {
            const lastActivity = c.activityLogs[0]?.timestamp || c.createdAt;
            if (lastActivity > thirtyMinutesAgo) continue; // Has recent activity, skip

            // Find next nearest NGO (excluding current assignee)
            const allNgos = await this.prisma.nGOProfile.findMany({
                where: {
                    verificationStatus: true,
                    id: { not: c.assignedNgoId! },
                },
            });

            const withDist = allNgos
                .map(n => ({
                    id: n.id,
                    orgName: n.orgName,
                    distance_meters: getDistanceMeters(c.latitude, c.longitude, n.latitude, n.longitude),
                }))
                .sort((a, b) => a.distance_meters - b.distance_meters);

            if (withDist.length === 0) continue;

            const previousNgoId = c.assignedNgoId!;
            const newNgo = withDist[0];

            // Reassign case
            await this.prisma.case.update({
                where: { id: c.id },
                data: { assignedNgoId: newNgo.id },
            });

            // Log escalation
            await this.prisma.activityLog.create({
                data: {
                    caseId: c.id,
                    actorId: c.assignedNgo!.userId,
                    actionType: 'AUTO_ESCALATED',
                    metadata: JSON.stringify({
                        reason: 'No response within 30 minutes',
                        previousNgoId,
                        newNgoId: newNgo.id,
                        newNgoName: newNgo.orgName,
                    }),
                },
            });

            // Emit WebSocket event
            this.eventsGateway.emitCaseEscalated({
                caseId: c.id,
                previousNgoId,
                newNgoId: newNgo.id,
                reason: 'No response within 30 minutes',
            });

            escalatedCount++;
            console.log(`⚠️ Case ${c.id} escalated from NGO ${previousNgoId} to ${newNgo.orgName}`);
        }

        return { escalatedCount, checkedAt: new Date().toISOString() };
    }

    // ─── Analytics Overview ───────────────────────────────────────────
    async getAnalyticsOverview() {
        const [totalCases, openCases, inProgressCases, resolvedCases] = await Promise.all([
            this.prisma.case.count(),
            this.prisma.case.count({ where: { status: 'OPEN' } }),
            this.prisma.case.count({ where: { status: 'IN_PROGRESS' } }),
            this.prisma.case.count({ where: { status: 'RESOLVED' } }),
        ]);

        const [criticalCases, moderateCases, stableCases] = await Promise.all([
            this.prisma.case.count({ where: { urgency: 'CRITICAL' } }),
            this.prisma.case.count({ where: { urgency: 'MODERATE' } }),
            this.prisma.case.count({ where: { urgency: 'STABLE' } }),
        ]);

        const donationTotal = await this.prisma.donation.aggregate({
            _sum: { amount: true },
            _count: true,
        });

        const totalNgos = await this.prisma.nGOProfile.count({ where: { verificationStatus: true } });

        // Top 5 NGOs by resolved cases
        const topNgos = await this.prisma.nGOProfile.findMany({
            take: 5,
            orderBy: { rating: 'desc' },
            select: { id: true, orgName: true, rating: true },
        });

        // All case locations for heatmap
        const caseLocations = await this.prisma.case.findMany({
            select: { latitude: true, longitude: true, urgency: true, status: true },
        });

        return {
            summary: {
                totalCases,
                openCases,
                inProgressCases,
                resolvedCases,
                successRate: totalCases > 0 ? Math.round((resolvedCases / totalCases) * 100) : 0,
            },
            urgencyBreakdown: { critical: criticalCases, moderate: moderateCases, stable: stableCases },
            financials: {
                totalDonations: donationTotal._sum.amount || 0,
                donationCount: donationTotal._count || 0,
            },
            totalVerifiedNgos: totalNgos,
            topNgos,
            caseLocations,
        };
    }
}

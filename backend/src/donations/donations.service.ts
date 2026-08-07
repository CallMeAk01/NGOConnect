import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@Injectable()
export class DonationsService {
    constructor(private readonly prisma: PrismaService) { }

    // ─── Record a Donation ─────────────────────────────────────────────
    async createDonation(dto: CreateDonationDto, donorId: string) {
        // If a caseId is provided, verify it exists
        if (dto.caseId) {
            const rescueCase = await this.prisma.case.findUnique({
                where: { id: dto.caseId },
            });
            if (!rescueCase) {
                throw new NotFoundException(`Case with ID ${dto.caseId} not found`);
            }
        }

        const donation = await this.prisma.donation.create({
            data: {
                donorId,
                caseId: dto.caseId || null,
                amount: dto.amount,
                currency: dto.currency || 'INR',
                transactionId: dto.transactionId,
            },
            include: {
                donor: { select: { id: true, email: true } },
                case: {
                    select: { id: true, description: true, status: true },
                },
            },
        });

        return donation;
    }

    // ─── Public Case Financials (Transparency) ────────────────────────
    async getCaseFinancials(caseId: string) {
        const rescueCase = await this.prisma.case.findUnique({
            where: { id: caseId },
            select: {
                id: true,
                description: true,
                status: true,
                urgency: true,
                createdAt: true,
            },
        });

        if (!rescueCase) {
            throw new NotFoundException(`Case with ID ${caseId} not found`);
        }

        // Aggregate total raised
        const donationAgg = await this.prisma.donation.aggregate({
            _sum: { amount: true },
            _count: { id: true },
            where: { caseId },
        });

        // List all donations for this case (public transparency)
        const donations = await this.prisma.donation.findMany({
            where: { caseId },
            select: {
                id: true,
                amount: true,
                currency: true,
                transactionId: true,
                timestamp: true,
                donor: { select: { id: true, email: true } },
            },
            orderBy: { timestamp: 'desc' },
        });

        return {
            case: rescueCase,
            financials: {
                totalRaised: donationAgg._sum.amount || 0,
                totalDonations: donationAgg._count.id || 0,
                currency: donations.length > 0 ? donations[0].currency : 'INR',
            },
            donations,
        };
    }
}

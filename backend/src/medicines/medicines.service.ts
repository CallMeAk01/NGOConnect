import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { QueryNearbyMedicinesDto } from './dto/query-nearby-medicines.dto';

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
export class MedicinesService {
    constructor(private readonly prisma: PrismaService) { }

    // ─── Donate / List a Medicine ──────────────────────────────────────
    async createMedicine(dto: CreateMedicineDto, donorId: string) {
        const medicine = await this.prisma.medicine.create({
            data: {
                donorId,
                name: dto.name,
                expiryDate: new Date(dto.expiryDate),
                type: dto.type,
                latitude: dto.latitude,
                longitude: dto.longitude,
                status: 'AVAILABLE',
            },
            include: {
                donor: { select: { id: true, email: true } },
            },
        });

        return medicine;
    }

    // ─── Find Nearby Available Medicines (PostGIS) ─────────────────────
    async findNearbyMedicines(query: QueryNearbyMedicinesDto) {
        const { latitude, longitude, radiusKm, page, limit } = query;
        const radiusMeters = (radiusKm || 50) * 1000;
        const offset = ((page || 1) - 1) * (limit || 20);

        const allMedicines = await this.prisma.medicine.findMany({
            where: {
                status: 'AVAILABLE',
                expiryDate: { gt: new Date() }
            },
            include: { donor: { select: { id: true, email: true } } }
        });

        const withDist = allMedicines.map(m => ({
            ...m,
            distance_meters: getDistanceMeters(latitude, longitude, m.latitude, m.longitude)
        })).filter(m => m.distance_meters <= radiusMeters)
            .sort((a, b) => a.distance_meters - b.distance_meters);

        const total = withDist.length;
        const pageNum = page || 1;
        const limitNum = limit || 20;
        const paginated = withDist.slice(offset, offset + limitNum);

        return {
            data: paginated,
            meta: {
                total,
                page: pageNum,
                limit: limitNum,
                totalPages: Math.ceil(total / limitNum),
                searchCenter: { latitude, longitude },
                radiusKm: radiusKm || 50,
            },
        };
    }
}

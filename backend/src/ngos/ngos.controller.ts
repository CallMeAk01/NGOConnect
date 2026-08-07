import { Controller, Get, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { NgosService } from './ngos.service';
import { QueryNgosDto } from './dto/query-ngos.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums';

@Controller('ngos')
export class NgosController {
    constructor(private readonly ngosService: NgosService) { }

    /**
     * GET /api/ngos
     * Directory search with optional location-based filtering (PostGIS).
     * Query params: ?latitude=X&longitude=Y&radiusKm=Z&page=1&limit=20
     */
    @Get()
    async findNgos(@Query() query: QueryNgosDto) {
        return this.ngosService.findNgos(query);
    }

    /**
     * GET /api/ngos/:id/impact
     * Return calculated impact metrics: success rate, total rescues, donations.
     */
    @Get(':id/impact')
    async getImpactMetrics(@Param('id') id: string) {
        return this.ngosService.getImpactMetrics(id);
    }

    /**
     * PATCH /api/ngos/:id/verify
     * Verify an NGO. Restricted to ADMIN.
     */
    @Patch(':id/verify')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async verifyNgo(@Param('id') id: string) {
        return this.ngosService.verifyNgo(id);
    }

    /**
     * GET /api/ngos/:id/credibility
     * Calculate and return a 0–100 credibility score with breakdown.
     */
    @Get(':id/credibility')
    async getCredibilityScore(@Param('id') id: string) {
        return this.ngosService.calculateCredibilityScore(id);
    }
}

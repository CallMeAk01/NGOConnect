import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Body,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { QueryCasesDto } from './dto/query-cases.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums';

@Controller('cases')
export class CasesController {
    constructor(private readonly casesService: CasesService) { }

    /**
     * POST /api/cases
     * Create a new rescue case report.
     * Authenticated users get their ID stored; anonymous submissions allowed.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    async createCase(@Body() dto: CreateCaseDto, @Request() req: any) {
        return this.casesService.createCase(dto, req.user?.id);
    }

    /**
     * GET /api/cases/analytics/overview
     * Platform-wide analytics overview for the impact dashboard.
     */
    @Get('analytics/overview')
    async getAnalyticsOverview() {
        return this.casesService.getAnalyticsOverview();
    }

    /**
     * GET /api/cases
     * Fetch cases with filters (status, urgency, date range).
     * Supports geospatial sorting: ?latitude=X&longitude=Y&radiusKm=Z
     */
    @Get()
    async findCases(@Query() query: QueryCasesDto) {
        return this.casesService.findCases(query);
    }

    /**
     * GET /api/cases/:id
     * Get a single case with full details and activity log.
     */
    @Get(':id')
    async findCaseById(@Param('id') id: string) {
        return this.casesService.findCaseById(id);
    }

    /**
     * PATCH /api/cases/:id/status
     * Update case status. Restricted to NGO and ADMIN roles.
     * Triggers ActivityLog entry + WebSocket event.
     */
    @Patch(':id/status')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.NGO, Role.ADMIN, Role.REPORTER)
    async updateCaseStatus(
        @Param('id') id: string,
        @Body() dto: UpdateCaseStatusDto,
        @Request() req: any,
    ) {
        return this.casesService.updateCaseStatus(id, dto, req.user.id, req.user.role);
    }
}

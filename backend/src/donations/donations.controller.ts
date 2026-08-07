import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    UseGuards,
    Request,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums';

@Controller()
export class DonationsController {
    constructor(private readonly donationsService: DonationsService) { }

    /**
     * POST /api/donations
     * Record a donation transaction. Restricted to DONOR role.
     */
    @Post('donations')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.DONOR)
    async createDonation(@Body() dto: CreateDonationDto, @Request() req: any) {
        return this.donationsService.createDonation(dto, req.user.id);
    }

    /**
     * GET /api/cases/:id/financials
     * Public endpoint showing total raised vs. donation details for a case.
     * No authentication required — this is the transparency layer.
     */
    @Get('cases/:id/financials')
    async getCaseFinancials(@Param('id') id: string) {
        return this.donationsService.getCaseFinancials(id);
    }
}

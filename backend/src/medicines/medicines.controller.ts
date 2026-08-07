import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    UseGuards,
    Request,
} from '@nestjs/common';
import { MedicinesService } from './medicines.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { QueryNearbyMedicinesDto } from './dto/query-nearby-medicines.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../enums';

@Controller('medicines')
export class MedicinesController {
    constructor(private readonly medicinesService: MedicinesService) { }

    /**
     * POST /api/medicines/donate
     * List a medicine for donation. Restricted to DONOR role.
     */
    @Post('donate')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.DONOR)
    async donateMedicine(@Body() dto: CreateMedicineDto, @Request() req: any) {
        return this.medicinesService.createMedicine(dto, req.user.id);
    }

    /**
     * GET /api/medicines/nearby
     * Find available, non-expired medicines near a lat/long.
     * Query params: ?latitude=X&longitude=Y&radiusKm=Z
     */
    @Get('nearby')
    async findNearby(@Query() query: QueryNearbyMedicinesDto) {
        return this.medicinesService.findNearbyMedicines(query);
    }
}

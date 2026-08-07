import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryNearbyMedicinesDto {
    @Type(() => Number)
    @IsNumber()
    latitude: number;

    @Type(() => Number)
    @IsNumber()
    longitude: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    radiusKm?: number = 50;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    limit?: number = 20;
}

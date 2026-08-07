import { IsEnum, IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CaseStatus, CaseUrgency } from '../../enums';

export class QueryCasesDto {
    @IsOptional()
    @IsEnum(CaseStatus)
    status?: CaseStatus;

    @IsOptional()
    @IsEnum(CaseUrgency)
    urgency?: CaseUrgency;

    @IsOptional()
    @IsString()
    dateFrom?: string;

    @IsOptional()
    @IsString()
    dateTo?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    longitude?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    radiusKm?: number;

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

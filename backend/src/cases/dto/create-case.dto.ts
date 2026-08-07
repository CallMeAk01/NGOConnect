import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsArray,
} from 'class-validator';
import { CaseUrgency } from '../../enums';

export class CreateCaseDto {
    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsEnum(CaseUrgency)
    urgency: CaseUrgency;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    images?: string[];
}

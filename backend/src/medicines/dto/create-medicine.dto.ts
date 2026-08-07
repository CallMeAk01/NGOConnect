import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsDateString,
} from 'class-validator';

export class CreateMedicineDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    expiryDate: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;
}

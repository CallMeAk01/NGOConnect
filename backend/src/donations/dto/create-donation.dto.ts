import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class CreateDonationDto {
    @IsOptional()
    @IsString()
    caseId?: string;

    @IsNumber()
    @Min(1)
    amount: number;

    @IsOptional()
    @IsString()
    currency?: string = 'INR';

    @IsString()
    @IsNotEmpty()
    transactionId: string;
}

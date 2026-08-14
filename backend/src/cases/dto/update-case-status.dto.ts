import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { CaseStatus } from '../../enums';

export class UpdateCaseStatusDto {
    @IsEnum(CaseStatus)
    status: CaseStatus;

    @IsOptional()
    @IsString()
    proofImage?: string;  // base64 encoded image from NGO

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    resolutionNote?: string;  // NGO's note about how the case was resolved
}

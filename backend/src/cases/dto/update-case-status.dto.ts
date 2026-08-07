import { IsEnum } from 'class-validator';
import { CaseStatus } from '../../enums';

export class UpdateCaseStatusDto {
    @IsEnum(CaseStatus)
    status: CaseStatus;
}

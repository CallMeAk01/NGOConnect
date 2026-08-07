import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { Role } from '../../enums';

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsEnum(Role)
    role: Role;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    // ─── Register ───────────────────────────────────────────────────────
    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(dto.password, salt);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                passwordHash,
                role: dto.role,
            },
        });

        const token = this.generateToken(user.id, user.email, user.role);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        };
    }

    // ─── Login ──────────────────────────────────────────────────────────
    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash ?? '');
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.generateToken(user.id, user.email, user.role);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                isVerified: user.isVerified,
            },
        };
    }

    // ─── Google OAuth — Find or Create ──────────────────────────────────
    async googleAuthLogin(profile: {
        googleId: string;
        email: string;
        name?: string;
        avatar?: string;
    }) {
        // 1. Try to find by googleId
        let user = await this.prisma.user.findUnique({
            where: { googleId: profile.googleId },
        });

        if (!user && profile.email) {
            // 2. Try to find by email (link Google to existing account)
            user = await this.prisma.user.findUnique({
                where: { email: profile.email },
            });
            if (user) {
                user = await this.prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: profile.googleId,
                        name: user.name || profile.name,
                        avatar: user.avatar || profile.avatar,
                        isVerified: true,
                    },
                });
            }
        }

        if (!user) {
            // 3. Create brand-new Google user (REPORTER by default)
            user = await this.prisma.user.create({
                data: {
                    email: profile.email,
                    googleId: profile.googleId,
                    name: profile.name,
                    avatar: profile.avatar,
                    passwordHash: null,
                    isVerified: true,
                    role: 'REPORTER',
                },
            });
        }

        const token = this.generateToken(user.id, user.email, user.role);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
                isVerified: user.isVerified,
            },
        };
    }

    // ─── Validate User (for Passport strategies) ──────────────────────
    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash ?? '');
        if (!isPasswordValid) return null;

        return {
            id: user.id,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        };
    }

    // ─── Token Generation ─────────────────────────────────────────────
    private generateToken(userId: string, email: string, role: string): string {
        const payload = { sub: userId, email, role };
        return this.jwtService.sign(payload);
    }
}

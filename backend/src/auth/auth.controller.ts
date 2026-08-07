import { Controller, Get, Req, Res, UseGuards, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    /**
     * POST /api/auth/register
     */
    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    /**
     * POST /api/auth/login
     */
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    /**
     * GET /api/auth/google
     * Initiates Google OAuth2 flow — redirects the browser to Google consent screen.
     */
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Guard triggers the redirect — no body needed
    }

    /**
     * GET /api/auth/google/callback
     * Google redirects here after the user grants consent.
     * We issue a JWT and redirect the frontend to #/auth/callback with it in the query string.
     */
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: any, @Res() res: any) {
        // req.user is set by GoogleStrategy.validate() — it's already the JWT result object
        const { access_token, user } = req.user;
        const encoded = encodeURIComponent(JSON.stringify(user));

        // Redirect to frontend with token. Adjust origin/port if needed.
        const frontendOrigin = process.env.FRONTEND_URL || 'http://localhost:5500';
        res.redirect(`${frontendOrigin}/#/auth/callback?token=${access_token}&user=${encoded}`);
    }
}

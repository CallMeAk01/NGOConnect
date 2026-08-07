import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // ─── Global Config ────────────────────────────────────────────────
    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3000;

    // ─── CORS ─────────────────────────────────────────────────────────
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    // ─── Global Error Handling / Exception Filter ────────────────────────
    app.useGlobalFilters(new HttpExceptionFilter());

    // ─── Global Validation Pipe ────────────────────────────────────────
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    // ─── WebSocket Adapter ────────────────────────────────────────────
    app.useWebSocketAdapter(new IoAdapter(app));

    // ─── API Prefix ───────────────────────────────────────────────────
    app.setGlobalPrefix('api');

    await app.listen(port);
    console.log(`🚀 NGO Connect API running on http://localhost:${port}`);
    console.log(`📡 WebSocket listening on ws://localhost:${port}`);

    // ─── Auto-Escalation Scheduler (every 5 minutes) ─────────────────
    const { CasesService } = await import('./cases/cases.service');
    const casesService = app.get(CasesService);
    setInterval(async () => {
        try {
            const result = await casesService.checkAndEscalate();
            if (result.escalatedCount > 0) {
                console.log(`⚠️ Auto-escalation: ${result.escalatedCount} case(s) reassigned`);
            }
        } catch (err) {
            console.error('Escalation check failed:', err.message);
        }
    }, 5 * 60 * 1000); // 5 minutes
    console.log('⏱️ Auto-escalation scheduler started (every 5 min)');
}

bootstrap();

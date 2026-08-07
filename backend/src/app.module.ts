import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CasesModule } from './cases/cases.module';
import { NgosModule } from './ngos/ngos.module';
import { MedicinesModule } from './medicines/medicines.module';
import { DonationsModule } from './donations/donations.module';
import { EventsModule } from './events/events.module';

@Module({
    imports: [
        // ─── Global Config ────────────────────────────────────────────
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),

        // ─── Shared ───────────────────────────────────────────────────
        PrismaModule,

        // ─── Feature Modules ──────────────────────────────────────────
        AuthModule,
        CasesModule,
        NgosModule,
        MedicinesModule,
        DonationsModule,
        EventsModule,
    ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { NgosController } from './ngos.controller';
import { NgosService } from './ngos.service';
import { ReviewsController } from './reviews.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [NgosController, ReviewsController],
    providers: [NgosService],
    exports: [NgosService],
})
export class NgosModule { }

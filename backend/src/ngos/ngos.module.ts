import { Module } from '@nestjs/common';
import { NgosController } from './ngos.controller';
import { NgosService } from './ngos.service';

@Module({
    controllers: [NgosController],
    providers: [NgosService],
    exports: [NgosService],
})
export class NgosModule { }

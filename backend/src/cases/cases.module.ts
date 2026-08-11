import { Module } from '@nestjs/common';
import { CasesController } from './cases.controller';
import { CasesService } from './cases.service';
import { EventsModule } from '../events/events.module';
import { AiModule } from '../ai/ai.module';

@Module({
    imports: [EventsModule, AiModule],
    controllers: [CasesController],
    providers: [CasesService],
    exports: [CasesService],
})
export class CasesModule { }

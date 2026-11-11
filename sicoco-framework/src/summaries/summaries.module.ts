import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesService } from './summaries.service.js';
import { SummariesController } from './summaries.controller.js';
import { Summary, SummarySchema } from './schemas/summary.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summary.name, schema: SummarySchema }]),
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
  exports: [SummariesService],
})
export class SummariesModule {}

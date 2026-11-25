import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SummariesService } from './summaries.service.js';
import { SummariesController } from './summaries.controller.js';
import { Summary, SummarySchema } from './schemas/summary.schema.js';
import { Transcript, TranscriptSchema } from '../transcripts/schemas/transcript.schema.js';
import { Task, TaskSchema } from '../tasks/schemas/task.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Summary.name, schema: SummarySchema },
      { name: Transcript.name, schema: TranscriptSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [SummariesController],
  providers: [SummariesService],
  exports: [SummariesService],
})
export class SummariesModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TranscriptsService } from './transcripts.service.js';
import { TranscriptsController } from './transcripts.controller.js';
import { Transcript, TranscriptSchema } from './schemas/transcript.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transcript.name, schema: TranscriptSchema },
    ]),
  ],
  controllers: [TranscriptsController],
  providers: [TranscriptsService],
  exports: [TranscriptsService],
})
export class TranscriptsModule {}

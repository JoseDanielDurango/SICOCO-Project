import { PartialType } from '@nestjs/swagger';
import { CreateTranscriptDto } from './create-transcript.dto.js';

export class UpdateTranscriptDto extends PartialType(CreateTranscriptDto) {}

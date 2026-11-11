import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ChatMessageDto {
  @ApiProperty({ description: 'Sender alias or username from chat', example: 'Jose_D' })
  senderAlias: string;

  @ApiProperty({ description: 'Message body content', example: 'Propongo usar NestJS y MongoDB' })
  content: string;

  @ApiPropertyOptional({ description: 'Timestamp of the message' })
  timestamp?: Date;

  @ApiPropertyOptional({ description: 'Order sequence number in chat flow', default: 0 })
  sequenceNumber?: number;
}

export class CreateTranscriptDto {
  @ApiProperty({ description: 'Session ID this chat belongs to' })
  sessionId: string;

  @ApiPropertyOptional({ description: 'ID of the student who captured/uploaded the transcript' })
  uploadedByStudentId?: string;

  @ApiPropertyOptional({ description: 'Source platform', default: 'WhatsApp Web' })
  sourcePlatform?: string;

  @ApiPropertyOptional({ description: 'Input format', default: 'DOM_SCRAPED' })
  format?: string;

  @ApiPropertyOptional({ description: 'Confidentiality flag', default: false })
  isConfidential?: boolean;

  @ApiProperty({ description: 'Captured chat messages', type: [ChatMessageDto] })
  messages: ChatMessageDto[];
}

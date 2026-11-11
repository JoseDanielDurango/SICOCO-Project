import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TranscriptDocument = HydratedDocument<Transcript>;

@Schema({ _id: false })
export class ChatMessage {
  @Prop({ required: true, trim: true })
  senderAlias: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: () => new Date() })
  timestamp: Date;

  @Prop({ default: 0 })
  sequenceNumber: number;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);

@Schema({ timestamps: true, collection: 'transcripts' })
export class Transcript {
  @Prop({ required: true, trim: true, index: true })
  sessionId: string;

  @Prop({ trim: true })
  uploadedByStudentId?: string;

  @Prop({ default: 'WhatsApp Web', trim: true })
  sourcePlatform: string;

  @Prop({ default: 'DOM_SCRAPED', trim: true })
  format: string; // DOM_SCRAPED, TXT_EXPORT, JSON_EXPORT

  @Prop({ default: 0 })
  dataSize: number;

  @Prop({ default: false })
  isConfidential: boolean;

  @Prop({ type: [ChatMessageSchema], default: [] })
  messages: ChatMessage[];
}

export const TranscriptSchema = SchemaFactory.createForClass(Transcript);

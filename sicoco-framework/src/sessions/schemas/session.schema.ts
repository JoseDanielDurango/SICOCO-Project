import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true, collection: 'sessions' })
export class Session {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true })
  generalObjective?: string;

  @Prop({ required: true, trim: true, index: true })
  teamId: string;

  @Prop({ default: () => new Date() })
  meetingDate: Date;

  @Prop({ default: 'WhatsApp', trim: true })
  platformOrigin: string; // WhatsApp, Discord, Teams, Meet

  @Prop({ default: 60 })
  estimatedDurationMinutes: number;

  @Prop({ default: 'Completed', trim: true })
  status: string; // Planned, Active, Completed, Archived
}

export const SessionSchema = SchemaFactory.createForClass(Session);

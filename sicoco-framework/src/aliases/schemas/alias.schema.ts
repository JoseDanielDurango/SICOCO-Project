import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentAliasDocument = StudentAlias & Document;

@Schema({ timestamps: true, collection: 'student_aliases' })
export class StudentAlias {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true, trim: true, unique: true })
  aliasText: string; // Nickname, alias or WhatsApp phone number used in chat

  @Prop({ default: 'whatsapp', trim: true })
  platformOrigin: string; // 'whatsapp' | 'discord' | 'teams'
}

export const StudentAliasSchema = SchemaFactory.createForClass(StudentAlias);

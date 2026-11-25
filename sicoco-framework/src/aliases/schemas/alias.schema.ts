import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentAliasDocument = StudentAlias & Document;

@Schema({ timestamps: true, collection: 'student_aliases' })
export class StudentAlias {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true, trim: true, unique: true })
  aliasText: string; // Apodo, alias o número de WhatsApp usado en el chat

  @Prop({ default: 'whatsapp', trim: true })
  platformOrigin: string; // 'whatsapp' | 'discord' | 'teams'
}

export const StudentAliasSchema = SchemaFactory.createForClass(StudentAlias);

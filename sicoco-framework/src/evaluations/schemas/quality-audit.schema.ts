import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QualityAuditDocument = QualityAudit & Document;

@Schema({ timestamps: true, collection: 'quality_audits' })
export class QualityAudit {
  @Prop({ required: true })
  summaryId: string;

  @Prop({ required: true })
  professorId: string; // Foreign key to professor (formal teacher audit U1-01)

  @Prop({ default: 0, min: 0 })
  falsePositivesCount: number;

  @Prop({ required: true, min: 1, max: 10 })
  fidelityScore: number; // Technical score from 1 to 10

  @Prop({ default: '' })
  technicalCritique: string;
}

export const QualityAuditSchema = SchemaFactory.createForClass(QualityAudit);

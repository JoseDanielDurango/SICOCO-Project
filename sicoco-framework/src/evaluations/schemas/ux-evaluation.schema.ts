import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UxEvaluationDocument = UxEvaluation & Document;

@Schema({ timestamps: true, collection: 'ux_evaluations' })
export class UxEvaluation {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  sessionId: string; // Contexto formal de la reunión analizada (U1-01)

  @Prop({ required: true, min: 1, max: 5 })
  visualClarityRating: number; // Escala Likert 1 a 5

  @Prop({ default: true })
  taskSeparationClear: boolean;

  @Prop({ default: '' })
  qualitativeFeedback: string;
}

export const UxEvaluationSchema = SchemaFactory.createForClass(UxEvaluation);

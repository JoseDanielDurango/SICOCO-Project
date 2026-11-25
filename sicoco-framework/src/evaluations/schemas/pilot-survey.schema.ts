import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PilotSurveyDocument = PilotSurvey & Document;

@Schema({ timestamps: true, collection: 'pilot_surveys' })
export class PilotSurvey {
  @Prop({ required: true })
  studentId: string;

  @Prop({ required: true })
  sessionId: string; // Formal context of the analyzed meeting (U1-01)

  @Prop({ default: true })
  goalComprehensionImproved: boolean;

  @Prop({ required: true, min: 1, max: 5 })
  groupSupportRating: number; // Likert scale 1 to 5

  @Prop({ default: '' })
  feedbackComments: string;
}

export const PilotSurveySchema = SchemaFactory.createForClass(PilotSurvey);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PromptConfigurationDocument = PromptConfiguration & Document;

@Schema({ timestamps: true, collection: 'prompt_configurations' })
export class PromptConfiguration {
  @Prop({ required: true, trim: true })
  styleName: string; // e.g., 'Formal / Académico', 'Rápido / Directo', 'Técnico Exhaustivo'

  @Prop({ required: true })
  systemPrompt: string; // Master instruction text sent to LLM

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: 0.7, min: 0, max: 2 })
  temperature: number;

  @Prop({ default: 'MODESEC 4 Pillars (Agreements, Disagreements, Doubts, Tasks)' })
  modesecFocus: string;
}

export const PromptConfigurationSchema =
  SchemaFactory.createForClass(PromptConfiguration);

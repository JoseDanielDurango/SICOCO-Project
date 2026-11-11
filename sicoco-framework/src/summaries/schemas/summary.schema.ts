import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SummaryDocument = HydratedDocument<Summary>;

@Schema({ _id: false })
export class AgreementItem {
  @Prop({ required: true, trim: true })
  solutionDescription: string;

  @Prop({ default: 'High', trim: true })
  importanceLevel: string; // High, Medium, Low

  @Prop({ trim: true })
  proposedByAlias?: string;
}
export const AgreementItemSchema = SchemaFactory.createForClass(AgreementItem);

@Schema({ _id: false })
export class DisagreementItem {
  @Prop({ required: true, trim: true })
  debateTopic: string;

  @Prop({ trim: true })
  oppositionDescription?: string;

  @Prop({ default: 'Active', trim: true })
  resolutionStatus: string; // Resolved, Active, Postponed
}
export const DisagreementItemSchema = SchemaFactory.createForClass(DisagreementItem);

@Schema({ _id: false })
export class DoubtItem {
  @Prop({ required: true, trim: true })
  mainQuestion: string;

  @Prop({ trim: true })
  relatedTopic?: string;

  @Prop({ default: false })
  resolved: boolean;
}
export const DoubtItemSchema = SchemaFactory.createForClass(DoubtItem);

@Schema({ _id: false })
export class TaskItem {
  @Prop({ required: true, trim: true })
  activityTitle: string;

  @Prop({ trim: true })
  assignedToAlias?: string;

  @Prop({ trim: true })
  assignedToStudentId?: string;

  @Prop({ default: 'Pending', trim: true })
  status: string; // Pending, InProgress, Completed, Overdue

  @Prop()
  dueDate?: Date;
}
export const TaskItemSchema = SchemaFactory.createForClass(TaskItem);

@Schema({ _id: false })
export class TimelineMoment {
  @Prop({ default: () => new Date() })
  timestamp: Date;

  @Prop({ required: true, trim: true })
  userAlias: string;

  @Prop({ required: true, trim: true })
  event: string; // 'Idea Nueva', 'Solución', 'Debate'

  @Prop({ type: [String], default: [] })
  connectedIdeaIds: string[];
}
export const TimelineMomentSchema = SchemaFactory.createForClass(TimelineMoment);

@Schema({ timestamps: true, collection: 'summaries' })
export class Summary {
  @Prop({ required: true, trim: true, index: true })
  sessionId: string;

  @Prop({ required: true, unique: true, index: true, trim: true })
  jobId: string;

  @Prop({ default: 'completed', trim: true })
  status: string; // queued, processing, completed, failed

  @Prop({ default: 'Formal', trim: true })
  style: string; // Fast, Formal, Analytical

  @Prop({ default: 'gemini-1.5-flash', trim: true })
  aiModelUsed: string;

  @Prop({ default: 0 })
  tokenUsage: number;

  @Prop({ trim: true })
  rawPlainText?: string;

  @Prop({ type: [AgreementItemSchema], default: [] })
  agreements: AgreementItem[];

  @Prop({ type: [DisagreementItemSchema], default: [] })
  disagreements: DisagreementItem[];

  @Prop({ type: [DoubtItemSchema], default: [] })
  doubts: DoubtItem[];

  @Prop({ type: [TaskItemSchema], default: [] })
  tasks: TaskItem[];

  @Prop({ type: [TimelineMomentSchema], default: [] })
  timeline: TimelineMoment[];

  @Prop({ trim: true })
  lastEditedById?: string;
}

export const SummarySchema = SchemaFactory.createForClass(Summary);

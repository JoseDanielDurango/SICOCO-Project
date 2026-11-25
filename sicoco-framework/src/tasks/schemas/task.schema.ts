import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true, collection: 'assigned_tasks' })
export class Task {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: null })
  assignedStudentId: string;

  @Prop({ default: 'Unassigned' })
  assignedStudentName: string;

  @Prop({ default: null })
  teamId: string;

  @Prop({ default: null })
  summaryId: string;

  @Prop({
    default: 'pending',
    enum: ['pending', 'in_progress', 'completed', 'overdue'],
  })
  status: string;

  @Prop({
    default: 'medium',
    enum: ['low', 'medium', 'high'],
  })
  priority: string;

  @Prop({ default: null })
  dueDate: Date;

  @Prop({ default: null })
  completedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

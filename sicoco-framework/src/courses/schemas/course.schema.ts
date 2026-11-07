import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CourseDocument = HydratedDocument<Course>;

@Schema({ timestamps: true, collection: 'courses' })
export class Course {
  @Prop({ required: true, unique: true, trim: true })
  code: string;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  academicSemester: string;

  @Prop({ trim: true })
  instructor?: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const CourseSchema = SchemaFactory.createForClass(Course);

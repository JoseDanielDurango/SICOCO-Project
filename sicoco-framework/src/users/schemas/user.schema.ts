import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export type UserRole = 'student' | 'teacher' | 'admin';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: false, select: false })
  password?: string;

  @Prop({ default: 'student', enum: ['student', 'teacher', 'admin'] })
  role: string;

  @Prop({ required: false })
  enrollmentNumber?: string;

  @Prop({ required: false, default: 'Computer Science' })
  academicProgram?: string;

  @Prop({ required: false })
  currentSemester?: number;

  @Prop({ required: false })
  age?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

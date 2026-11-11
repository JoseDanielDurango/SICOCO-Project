import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TeamDocument = HydratedDocument<Team>;

@Schema({ _id: false })
export class TeamMember {
  @Prop({ required: true, trim: true })
  studentId: string;

  @Prop({ trim: true })
  name?: string;

  @Prop({ default: 'Member', trim: true })
  role: string;

  @Prop({ default: () => new Date() })
  joinedAt: Date;
}

export const TeamMemberSchema = SchemaFactory.createForClass(TeamMember);

@Schema({ timestamps: true, collection: 'teams' })
export class Team {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true, index: true })
  courseId: string;

  @Prop({ type: [TeamMemberSchema], default: [] })
  members: TeamMember[];

  @Prop({ default: false })
  requiresTeacherApproval: boolean;

  @Prop({ default: true })
  isActive: boolean;
}

export const TeamSchema = SchemaFactory.createForClass(Team);

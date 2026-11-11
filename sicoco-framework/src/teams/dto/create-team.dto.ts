import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamMemberDto {
  @ApiProperty({ description: 'ID of the enrolled student' })
  studentId: string;

  @ApiPropertyOptional({ description: 'Full name or alias of the student' })
  name?: string;

  @ApiPropertyOptional({ description: 'Role within team', default: 'Member' })
  role?: string;
}

export class CreateTeamDto {
  @ApiProperty({ description: 'Name of the collaborative team', example: 'Grupo Alfa' })
  name: string;

  @ApiProperty({ description: 'Course ID the team belongs to' })
  courseId: string;

  @ApiPropertyOptional({ description: 'Initial team members', type: [TeamMemberDto] })
  members?: TeamMemberDto[];

  @ApiPropertyOptional({ description: 'Whether the team composition requires teacher approval', default: false })
  requiresTeacherApproval?: boolean;

  @ApiPropertyOptional({ description: 'Active status of the team', default: true })
  isActive?: boolean;
}

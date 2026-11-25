import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePilotSurveyDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ce',
    description: 'Participating student ID',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cf',
    description: 'Linked work session ID (U1-01)',
  })
  @IsString()
  sessionId: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Did SICOCO improve understanding of group goals and milestones?',
  })
  @IsOptional()
  @IsBoolean()
  goalComprehensionImproved?: boolean;

  @ApiProperty({
    example: 5,
    description: 'Perception of support for collaborative teamwork (scale 1 to 5)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  groupSupportRating: number;

  @ApiPropertyOptional({
    example: 'SICOCO helped us keep track of decisions made in WhatsApp chat.',
    description: 'Final comments on formative utility',
  })
  @IsOptional()
  @IsString()
  feedbackComments?: string;
}

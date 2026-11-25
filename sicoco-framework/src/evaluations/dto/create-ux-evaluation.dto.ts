import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUxEvaluationDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'Evaluating student ID',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cd',
    description: 'Contextualized work session ID (U1-01)',
  })
  @IsString()
  sessionId: string;

  @ApiProperty({
    example: 5,
    description: 'Visual clarity of dashboard interface (scale 1 to 5)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  visualClarityRating: number;

  @ApiPropertyOptional({
    example: true,
    description: 'Was visual separation by categories and tasks clear?',
  })
  @IsOptional()
  @IsBoolean()
  taskSeparationClear?: boolean;

  @ApiPropertyOptional({
    example: 'The tab views and timeline made it easy to understand agreements.',
    description: 'Qualitative comments and feedback from student',
  })
  @IsOptional()
  @IsString()
  qualitativeFeedback?: string;
}

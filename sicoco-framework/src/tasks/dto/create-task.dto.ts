import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implement dashboard interface in React',
    description: 'Descriptive title of assigned academic task',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({
    example: 'Build tab views and co-creation timeline',
    description: 'Task specifications and details',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109ca',
    description: 'MongoDB ID of assigned student',
  })
  @IsOptional()
  @IsString()
  assignedStudentId?: string;

  @ApiPropertyOptional({
    example: 'Jose Daniel Durango',
    description: 'Name or alias of responsible student',
  })
  @IsOptional()
  @IsString()
  assignedStudentName?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109cb',
    description: 'ID of collaborative team owning the task',
  })
  @IsOptional()
  @IsString()
  teamId?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109cc',
    description: 'ID of MODESEC summary originating the task',
  })
  @IsOptional()
  @IsString()
  summaryId?: string;

  @ApiPropertyOptional({
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed', 'overdue'],
    description: 'Task lifecycle status',
  })
  @IsOptional()
  @IsIn(['pending', 'in_progress', 'completed', 'overdue'])
  status?: string;

  @ApiPropertyOptional({
    example: 'high',
    enum: ['low', 'medium', 'high'],
    description: 'Task priority level',
  })
  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional({
    example: '2026-12-05T23:59:59.000Z',
    description: 'Agreed delivery deadline for the team',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

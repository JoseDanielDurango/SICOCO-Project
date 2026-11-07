import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'CS101', description: 'Unique course code' })
  code: string;

  @ApiProperty({ example: 'Introduction to Computer Science', description: 'Course name' })
  name: string;

  @ApiProperty({ example: '2026-1', description: 'Academic semester' })
  academicSemester: string;

  @ApiPropertyOptional({ example: 'Dr. Jane Doe', description: 'Instructor name' })
  instructor?: string;

  @ApiPropertyOptional({ example: 'Basics of programming and algorithms', description: 'Course description' })
  description?: string;

  @ApiPropertyOptional({ example: true, description: 'Whether the course is active', default: true })
  isActive?: boolean;
}

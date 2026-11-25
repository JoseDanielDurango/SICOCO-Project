import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Jose Daniel Durango', description: 'User full name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'josedaniel@unicordoba.edu.co',
    description: 'Unique institutional email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'User password (minimum 6 characters)',
  })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    example: 'student',
    enum: ['student', 'teacher', 'admin'],
    description: 'Role within the platform',
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({
    example: '202610204',
    description: 'Student enrollment code or employee ID',
  })
  @IsString()
  @IsOptional()
  enrollmentNumber?: string;

  @ApiPropertyOptional({
    example: 'Computer Science',
    description: 'Academic program',
  })
  @IsString()
  @IsOptional()
  academicProgram?: string;

  @ApiPropertyOptional({
    example: 9,
    description: 'Current academic semester',
  })
  @IsNumber()
  @IsOptional()
  currentSemester?: number;
}

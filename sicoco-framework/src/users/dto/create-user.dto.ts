import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Alice Smith', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'alice@unicordoba.edu.co',
    description: 'Unique email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({
    example: 'SecretPassword123!',
    description: 'User password',
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: 'student',
    enum: ['student', 'teacher', 'admin'],
    description: 'System role',
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiPropertyOptional({
    example: '202610101',
    description: 'Student or employee enrollment number',
  })
  @IsString()
  @IsOptional()
  enrollmentNumber?: string;

  @ApiPropertyOptional({
    example: 'Licenciatura en Informática',
    description: 'Academic program',
  })
  @IsString()
  @IsOptional()
  academicProgram?: string;

  @ApiPropertyOptional({ example: 9, description: 'Current academic semester' })
  @IsNumber()
  @IsOptional()
  currentSemester?: number;

  @ApiPropertyOptional({ example: 22, description: 'Age of the user' })
  @IsNumber()
  @IsOptional()
  age?: number;
}

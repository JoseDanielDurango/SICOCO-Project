import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'josedaniel@unicordoba.edu.co',
    description: 'Registered user email address',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'SecurePassword123!',
    description: 'Registered user password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

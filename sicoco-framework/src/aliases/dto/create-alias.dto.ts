import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAliasDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'Official university student ID',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    example: 'Jose_D',
    description: 'Nickname or handle used in WhatsApp or Discord',
  })
  @IsString()
  @MinLength(2)
  aliasText: string;

  @ApiProperty({
    example: 'whatsapp',
    description: 'Platform where this alias was detected',
  })
  @IsString()
  @IsNotEmpty()
  platformOrigin: string;
}

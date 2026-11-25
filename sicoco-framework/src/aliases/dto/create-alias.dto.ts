import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAliasDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID del estudiante universitario oficial',
  })
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @ApiProperty({
    example: 'Jose_D',
    description: 'Apodo o identificador que usa en WhatsApp o Discord',
  })
  @IsString()
  @MinLength(2)
  aliasText: string;

  @ApiProperty({
    example: 'whatsapp',
    description: 'Plataforma donde se detecta este alias',
  })
  @IsString()
  @IsNotEmpty()
  platformOrigin: string;
}

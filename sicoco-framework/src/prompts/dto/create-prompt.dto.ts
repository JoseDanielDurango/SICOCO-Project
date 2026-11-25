import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreatePromptDto {
  @ApiProperty({
    example: 'Formal / Académico',
    description: 'Nombre del estilo pedagógico de resumen',
  })
  @IsString()
  @MinLength(3)
  styleName: string;

  @ApiProperty({
    example:
      'Eres el asistente pedagógico SICOCO. Analiza el chat y clasifica estrictamente en los cuatro pilares MODESEC: Acuerdos, Desacuerdos, Dudas y Tareas.',
    description: 'Instrucción matriz enviada al LLM',
  })
  @IsString()
  @MinLength(20)
  systemPrompt: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si este estilo está activo para los estudiantes',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 0.7,
    description: 'Temperatura del modelo de lenguaje (0.0 a 2.0)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    example: 'MODESEC Competencias Colaborativas',
    description: 'Foco pedagógico principal del prompt',
  })
  @IsOptional()
  @IsString()
  modesecFocus?: string;
}

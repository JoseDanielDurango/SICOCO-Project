import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUxEvaluationDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109cc',
    description: 'ID del estudiante evaluador',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cd',
    description: 'ID de la sesión de trabajo contextualizada (U1-01)',
  })
  @IsString()
  sessionId: string;

  @ApiProperty({
    example: 5,
    description: 'Claridad visual de la interfaz del dashboard (escala 1 a 5)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  visualClarityRating: number;

  @ApiPropertyOptional({
    example: true,
    description: '¿Fue clara la separación visual por categorías y tareas?',
  })
  @IsOptional()
  @IsBoolean()
  taskSeparationClear?: boolean;

  @ApiPropertyOptional({
    example: 'La vista de pestañas y el timeline facilitaron entender los acuerdos.',
    description: 'Comentarios y sugerencias libres del usuario',
  })
  @IsOptional()
  @IsString()
  qualitativeFeedback?: string;
}

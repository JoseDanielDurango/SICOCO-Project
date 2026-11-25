import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateQualityAuditDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID de MongoDB del resumen evaluado',
  })
  @IsString()
  summaryId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'ID del docente responsable de la evaluación (U1-01)',
  })
  @IsString()
  professorId: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Número de elementos incorrectamente categorizados por la IA',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  falsePositivesCount?: number;

  @ApiProperty({
    example: 9,
    description: 'Puntuación de fidelidad textual y pertinencia (escala 1 a 10)',
  })
  @IsInt()
  @Min(1)
  @Max(10)
  fidelityScore: number;

  @ApiPropertyOptional({
    example: 'Excelente síntesis de los 4 pilares con correcta trazabilidad de tareas.',
    description: 'Observaciones y comentarios técnicos del evaluador',
  })
  @IsOptional()
  @IsString()
  technicalCritique?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreatePilotSurveyDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ce',
    description: 'ID del estudiante participante',
  })
  @IsString()
  studentId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cf',
    description: 'ID de la sesión de trabajo vinculada (U1-01)',
  })
  @IsString()
  sessionId: string;

  @ApiPropertyOptional({
    example: true,
    description: '¿Mejoró la comprensión de los objetivos y metas del grupo gracias a SICOCO?',
  })
  @IsOptional()
  @IsBoolean()
  goalComprehensionImproved?: boolean;

  @ApiProperty({
    example: 5,
    description: 'Percepción de apoyo al trabajo colaborativo en equipo (escala 1 a 5)',
  })
  @IsInt()
  @Min(1)
  @Max(5)
  groupSupportRating: number;

  @ApiPropertyOptional({
    example: 'SICOCO nos ayudó a no perder las decisiones que tomamos en el chat de WhatsApp.',
    description: 'Comentarios finales sobre la utilidad formativa',
  })
  @IsOptional()
  @IsString()
  feedbackComments?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Implementar interfaz del dashboard en React',
    description: 'Título descriptivo de la actividad académica asignada',
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiPropertyOptional({
    example: 'Construir vistas de pestañas y timeline de co-creación',
    description: 'Detalles o especificaciones de la tarea',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109ca',
    description: 'ID de MongoDB del estudiante asignado',
  })
  @IsOptional()
  @IsString()
  assignedStudentId?: string;

  @ApiPropertyOptional({
    example: 'Jose Daniel Durango',
    description: 'Nombre o alias del estudiante responsable',
  })
  @IsOptional()
  @IsString()
  assignedStudentName?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109cb',
    description: 'ID del equipo colaborativo al que pertenece la tarea',
  })
  @IsOptional()
  @IsString()
  teamId?: string;

  @ApiPropertyOptional({
    example: '60d0fe4f5311236168a109cc',
    description: 'ID del resumen MODESEC de donde provino la tarea',
  })
  @IsOptional()
  @IsString()
  summaryId?: string;

  @ApiPropertyOptional({
    example: 'pending',
    enum: ['pending', 'in_progress', 'completed', 'overdue'],
    description: 'Estado del ciclo de vida de la tarea',
  })
  @IsOptional()
  @IsIn(['pending', 'in_progress', 'completed', 'overdue'])
  status?: string;

  @ApiPropertyOptional({
    example: 'high',
    enum: ['low', 'medium', 'high'],
    description: 'Nivel de prioridad de la tarea',
  })
  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  priority?: string;

  @ApiPropertyOptional({
    example: '2026-12-05T23:59:59.000Z',
    description: 'Fecha límite de entrega pactada por el equipo',
  })
  @IsOptional()
  @IsDateString()
  dueDate?: string;
}

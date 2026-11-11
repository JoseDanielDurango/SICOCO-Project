import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ description: 'Title or topic of the meeting session', example: 'Discusión Arquitectura Base de Datos' })
  title: string;

  @ApiPropertyOptional({ description: 'General objective of the meeting session' })
  generalObjective?: string;

  @ApiProperty({ description: 'Team ID this session belongs to' })
  teamId: string;

  @ApiPropertyOptional({ description: 'Date and time of the meeting session', default: 'Current timestamp' })
  meetingDate?: Date;

  @ApiPropertyOptional({ description: 'Communication platform origin', example: 'WhatsApp Web', default: 'WhatsApp' })
  platformOrigin?: string;

  @ApiPropertyOptional({ description: 'Estimated duration in minutes', default: 60 })
  estimatedDurationMinutes?: number;

  @ApiPropertyOptional({ description: 'Status of session', default: 'Completed' })
  status?: string;
}

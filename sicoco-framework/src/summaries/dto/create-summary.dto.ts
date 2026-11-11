import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AgreementDto {
  @ApiProperty({ description: 'Description of agreed decision', example: 'Adoptar arquitectura NestJS' })
  solutionDescription: string;

  @ApiPropertyOptional({ description: 'Importance level', default: 'High' })
  importanceLevel?: string;

  @ApiPropertyOptional({ description: 'Alias of member who proposed' })
  proposedByAlias?: string;
}

export class DisagreementDto {
  @ApiProperty({ description: 'Debate or conflict topic', example: 'Uso de PostgreSQL vs MongoDB' })
  debateTopic: string;

  @ApiPropertyOptional({ description: 'Detailed opposition points' })
  oppositionDescription?: string;

  @ApiPropertyOptional({ description: 'Resolution status', default: 'Resolved' })
  resolutionStatus?: string;
}

export class DoubtDto {
  @ApiProperty({ description: 'Unresolved question', example: '¿Cómo limitamos el consumo de tokens?' })
  mainQuestion: string;

  @ApiPropertyOptional({ description: 'Related thematic area' })
  relatedTopic?: string;

  @ApiPropertyOptional({ description: 'Whether the doubt was solved', default: false })
  resolved?: boolean;
}

export class TaskDto {
  @ApiProperty({ description: 'Action item title', example: 'Configurar conexión Mongoose' })
  activityTitle: string;

  @ApiPropertyOptional({ description: 'Assigned student alias' })
  assignedToAlias?: string;

  @ApiPropertyOptional({ description: 'Assigned student ID' })
  assignedToStudentId?: string;

  @ApiPropertyOptional({ description: 'Task status', default: 'Pending' })
  status?: string;

  @ApiPropertyOptional({ description: 'Due date' })
  dueDate?: Date;
}

export class TimelineMomentDto {
  @ApiPropertyOptional({ description: 'Moment timestamp' })
  timestamp?: Date;

  @ApiProperty({ description: 'User alias' })
  userAlias: string;

  @ApiProperty({ description: 'Event type', example: 'Propuesta de Base de Datos' })
  event: string;

  @ApiPropertyOptional({ description: 'IDs of connected or inspired ideas', type: [String] })
  connectedIdeaIds?: string[];
}

export class CreateSummaryDto {
  @ApiProperty({ description: 'Session ID' })
  sessionId: string;

  @ApiPropertyOptional({ description: 'Async Job ID (auto-generated if omitted)' })
  jobId?: string;

  @ApiPropertyOptional({ description: 'Status of the AI synthesis job', default: 'completed' })
  status?: string;

  @ApiPropertyOptional({ description: 'Summary tone/style', default: 'Formal' })
  style?: string;

  @ApiPropertyOptional({ description: 'Model used for inference', default: 'gemini-1.5-flash' })
  aiModelUsed?: string;

  @ApiPropertyOptional({ description: 'Total tokens consumed', default: 0 })
  tokenUsage?: number;

  @ApiPropertyOptional({ description: 'Fallback plain text synthesis' })
  rawPlainText?: string;

  @ApiPropertyOptional({ description: 'List of agreements', type: [AgreementDto] })
  agreements?: AgreementDto[];

  @ApiPropertyOptional({ description: 'List of disagreements', type: [DisagreementDto] })
  disagreements?: DisagreementDto[];

  @ApiPropertyOptional({ description: 'List of unresolved doubts', type: [DoubtDto] })
  doubts?: DoubtDto[];

  @ApiPropertyOptional({ description: 'List of assigned tasks (To-Do)', type: [TaskDto] })
  tasks?: TaskDto[];

  @ApiPropertyOptional({ description: 'Timeline moments of co-creation', type: [TimelineMomentDto] })
  timeline?: TimelineMomentDto[];
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GenerateSummaryDto {
  @ApiProperty({ description: 'Session ID whose transcripts should be summarized' })
  sessionId: string;

  @ApiPropertyOptional({ description: 'Synthesis style', default: 'Formal' })
  style?: string;

  @ApiPropertyOptional({ description: 'Specific prompt instructions to override defaults' })
  promptInstructions?: string;
}

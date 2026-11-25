import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateQualityAuditDto {
  @ApiProperty({
    example: '60d0fe4f5311236168a109ca',
    description: 'MongoDB ID of the evaluated summary',
  })
  @IsString()
  summaryId: string;

  @ApiProperty({
    example: '60d0fe4f5311236168a109cb',
    description: 'ID of the teacher responsible for the audit (U1-01)',
  })
  @IsString()
  professorId: string;

  @ApiPropertyOptional({
    example: 0,
    description: 'Count of elements incorrectly categorized by the AI',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  falsePositivesCount?: number;

  @ApiProperty({
    example: 9,
    description: 'Textual fidelity and relevance score (scale 1 to 10)',
  })
  @IsInt()
  @Min(1)
  @Max(10)
  fidelityScore: number;

  @ApiPropertyOptional({
    example: 'Excellent synthesis of the 4 pillars with accurate task traceability.',
    description: 'Technical observations and critique from the reviewer',
  })
  @IsOptional()
  @IsString()
  technicalCritique?: string;
}

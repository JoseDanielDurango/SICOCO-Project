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
    example: 'Formal / Academic',
    description: 'Pedagogical summary style name',
  })
  @IsString()
  @MinLength(3)
  styleName: string;

  @ApiProperty({
    example:
      'You are the SICOCO pedagogical assistant. Analyze the chat and strictly classify into the four MODESEC pillars: Agreements, Disagreements, Doubts, and Tasks.',
    description: 'Master instruction sent to the LLM',
  })
  @IsString()
  @MinLength(20)
  systemPrompt: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Indicates whether this style is active for students',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 0.7,
    description: 'Language model temperature (0.0 to 2.0)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(2)
  temperature?: number;

  @ApiPropertyOptional({
    example: 'MODESEC Collaborative Competencies',
    description: 'Primary pedagogical focus of the prompt',
  })
  @IsOptional()
  @IsString()
  modesecFocus?: string;
}

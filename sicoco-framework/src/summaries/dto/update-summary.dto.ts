import { PartialType } from '@nestjs/swagger';
import { CreateSummaryDto } from './create-summary.dto.js';

export class UpdateSummaryDto extends PartialType(CreateSummaryDto) {}

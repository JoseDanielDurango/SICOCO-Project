import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { SummariesService } from './summaries.service.js';
import { CreateSummaryDto } from './dto/create-summary.dto.js';
import { UpdateSummaryDto } from './dto/update-summary.dto.js';
import { GenerateSummaryDto } from './dto/generate-summary.dto.js';

@ApiTags('summaries')
@Controller('summaries')
export class SummariesController {
  constructor(private readonly summariesService: SummariesService) {}

  @Post()
  @ApiOperation({ summary: 'Save or register a pre-structured summary' })
  create(@Body() createSummaryDto: CreateSummaryDto) {
    return this.summariesService.create(createSummaryDto);
  }

  @Post('generate')
  @ApiOperation({
    summary: 'Trigger AI synthesis of chat transcripts for a session (MODESEC 4 pillars)',
  })
  generate(@Body() generateSummaryDto: GenerateSummaryDto) {
    return this.summariesService.generate(generateSummaryDto);
  }

  @Get('job/:jobId')
  @ApiOperation({ summary: 'Poll synthesis status by async Job ID' })
  findByJobId(@Param('jobId') jobId: string) {
    return this.summariesService.findByJobId(jobId);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve all summaries (optionally filter by sessionId)',
  })
  @ApiQuery({ name: 'sessionId', required: false })
  findAll(@Query('sessionId') sessionId?: string) {
    return this.summariesService.findAll(sessionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve summary details by ID' })
  findOne(@Param('id') id: string) {
    return this.summariesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update or manually edit summary contents' })
  update(
    @Param('id') id: string,
    @Body() updateSummaryDto: UpdateSummaryDto,
  ) {
    return this.summariesService.update(id, updateSummaryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a summary record' })
  remove(@Param('id') id: string) {
    return this.summariesService.remove(id);
  }
}

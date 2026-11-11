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
import { TranscriptsService } from './transcripts.service.js';
import { CreateTranscriptDto, ChatMessageDto } from './dto/create-transcript.dto.js';
import { UpdateTranscriptDto } from './dto/update-transcript.dto.js';

@ApiTags('transcripts')
@Controller('transcripts')
export class TranscriptsController {
  constructor(private readonly transcriptsService: TranscriptsService) {}

  @Post()
  @ApiOperation({ summary: 'Ingest a chat transcript with extracted messages' })
  create(@Body() createTranscriptDto: CreateTranscriptDto) {
    return this.transcriptsService.create(createTranscriptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all transcripts (optionally filter by sessionId)' })
  @ApiQuery({ name: 'sessionId', required: false })
  findAll(@Query('sessionId') sessionId?: string) {
    return this.transcriptsService.findAll(sessionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve transcript details and full message list' })
  findOne(@Param('id') id: string) {
    return this.transcriptsService.findOne(id);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Append newly scraped messages to an existing transcript' })
  appendMessages(
    @Param('id') id: string,
    @Body() newMessages: ChatMessageDto[],
  ) {
    return this.transcriptsService.appendMessages(id, newMessages);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update transcript metadata' })
  update(
    @Param('id') id: string,
    @Body() updateTranscriptDto: UpdateTranscriptDto,
  ) {
    return this.transcriptsService.update(id, updateTranscriptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transcript record' })
  remove(@Param('id') id: string) {
    return this.transcriptsService.remove(id);
  }
}

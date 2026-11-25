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
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { TranscriptsService } from './transcripts.service.js';
import {
  CreateTranscriptDto,
  ChatMessageDto,
} from './dto/create-transcript.dto.js';
import { UpdateTranscriptDto } from './dto/update-transcript.dto.js';

@ApiTags('transcripts')
@Controller('transcripts')
export class TranscriptsController {
  constructor(private readonly transcriptsService: TranscriptsService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new chat transcript package' })
  create(@Body() createTranscriptDto: CreateTranscriptDto) {
    return this.transcriptsService.create(createTranscriptDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve transcripts (optionally filter by sessionId)',
  })
  @ApiQuery({ name: 'sessionId', required: false })
  findAll(@Query('sessionId') sessionId?: string) {
    return this.transcriptsService.findAll(sessionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve full transcript details with message log' })
  findOne(@Param('id') id: string) {
    return this.transcriptsService.findOne(id);
  }

  @Post(':id/messages')
  @ApiOperation({ summary: 'Append structured chat messages in bulk to transcript' })
  @ApiBody({ type: [ChatMessageDto] })
  appendMessages(
    @Param('id') id: string,
    @Body() messages: ChatMessageDto[],
  ) {
    return this.transcriptsService.appendMessages(id, messages);
  }

  @Post(':id/parse-raw')
  @ApiOperation({
    summary: 'Ingest and parse raw text logs from WhatsApp or Discord',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        rawText: { type: 'string' },
        platform: { type: 'string', default: 'WhatsApp' },
      },
      required: ['rawText'],
    },
  })
  parseRaw(
    @Param('id') id: string,
    @Body('rawText') rawText: string,
    @Body('platform') platform?: string,
  ) {
    return this.transcriptsService.parseRawChat(id, rawText, platform);
  }

  @Patch(':id/toggle-confidential')
  @ApiOperation({ summary: 'Toggle confidentiality flag for student chat privacy' })
  toggleConfidentiality(@Param('id') id: string) {
    return this.transcriptsService.toggleConfidentiality(id);
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

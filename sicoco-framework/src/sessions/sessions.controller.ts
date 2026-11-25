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
import { SessionsService } from './sessions.service.js';
import { CreateSessionDto } from './dto/create-session.dto.js';
import { UpdateSessionDto } from './dto/update-session.dto.js';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule or register a new co-creation session' })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve sessions (optionally filter by teamId)' })
  @ApiQuery({ name: 'teamId', required: false })
  findAll(@Query('teamId') teamId?: string) {
    return this.sessionsService.findAll(teamId);
  }

  @Get(':id/packet')
  @ApiOperation({ summary: 'Retrieve comprehensive session delivery packet' })
  getSessionPacket(@Param('id') id: string) {
    return this.sessionsService.getSessionPacket(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve session details by ID' })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update session lifecycle status (Planned, Active, Completed, Archived)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: { status: { type: 'string', enum: ['Planned', 'Active', 'Completed', 'Archived'] } },
      required: ['status'],
    },
  })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.sessionsService.updateStatus(id, status);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update session details' })
  update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session record' })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }
}

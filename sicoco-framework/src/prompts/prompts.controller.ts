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
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { PromptsService } from './prompts.service.js';
import { CreatePromptDto } from './dto/create-prompt.dto.js';
import { UpdatePromptDto } from './dto/update-prompt.dto.js';

@ApiTags('prompts')
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new master AI prompt configuration' })
  @ApiResponse({ status: 201, description: 'Prompt configuration created successfully.' })
  create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  @ApiOperation({ summary: 'List prompt configurations' })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'Filter active styles only',
  })
  findAll(@Query('activeOnly') activeOnly?: boolean) {
    return this.promptsService.findAll(activeOnly);
  }

  @Get('default-active')
  @ApiOperation({ summary: 'Retrieve default active prompt configuration' })
  findDefault() {
    return this.promptsService.findActiveDefault();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve prompt configuration by ID' })
  findOne(@Param('id') id: string) {
    return this.promptsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update prompt configuration' })
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle active/inactive state of prompt style' })
  toggleActive(@Param('id') id: string) {
    return this.promptsService.toggleActive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete prompt configuration' })
  remove(@Param('id') id: string) {
    return this.promptsService.remove(id);
  }
}

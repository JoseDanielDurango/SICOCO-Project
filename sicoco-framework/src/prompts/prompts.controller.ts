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
  @ApiOperation({ summary: 'Crear nueva configuración de prompt maestro de IA' })
  @ApiResponse({ status: 201, description: 'Configuración creada exitosamente.' })
  create(@Body() createPromptDto: CreatePromptDto) {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar configuraciones de prompts' })
  @ApiQuery({
    name: 'activeOnly',
    required: false,
    type: Boolean,
    description: 'Filtrar solo estilos activos',
  })
  findAll(@Query('activeOnly') activeOnly?: boolean) {
    return this.promptsService.findAll(activeOnly);
  }

  @Get('default-active')
  @ApiOperation({ summary: 'Obtener la configuración activa predeterminada' })
  findDefault() {
    return this.promptsService.findActiveDefault();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar configuración de prompt por ID' })
  findOne(@Param('id') id: string) {
    return this.promptsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar configuración de prompt' })
  update(@Param('id') id: string, @Body() updatePromptDto: UpdatePromptDto) {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Alternar estado activo/inactivo del estilo' })
  toggleActive(@Param('id') id: string) {
    return this.promptsService.toggleActive(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar configuración de prompt' })
  remove(@Param('id') id: string) {
    return this.promptsService.remove(id);
  }
}

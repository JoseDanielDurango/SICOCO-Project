import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AliasesService } from './aliases.service.js';
import { CreateAliasDto } from './dto/create-alias.dto.js';

@ApiTags('aliases')
@Controller('aliases')
export class AliasesController {
  constructor(private readonly aliasesService: AliasesService) {}

  @Post()
  @ApiOperation({ summary: 'Homologar alias de chat con estudiante oficial (U1-01)' })
  @ApiResponse({ status: 201, description: 'Alias homologado con éxito.' })
  create(@Body() createDto: CreateAliasDto) {
    return this.aliasesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar catálogo de alias homologados' })
  findAll() {
    return this.aliasesService.findAll();
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Consultar alias de un estudiante' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.aliasesService.findByStudent(studentId);
  }

  @Get('resolve/:aliasText')
  @ApiOperation({ summary: 'Resolver estudiante a partir del alias del chat' })
  resolveAlias(@Param('aliasText') aliasText: string) {
    return this.aliasesService.resolveAlias(aliasText);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar homologación de alias' })
  remove(@Param('id') id: string) {
    return this.aliasesService.remove(id);
  }
}

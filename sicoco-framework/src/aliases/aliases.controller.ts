import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AliasesService } from './aliases.service.js';
import { CreateAliasDto } from './dto/create-alias.dto.js';

@ApiTags('aliases')
@Controller('aliases')
export class AliasesController {
  constructor(private readonly aliasesService: AliasesService) {}

  @Post()
  @ApiOperation({ summary: 'Map chat alias to official university student (U1-01)' })
  @ApiResponse({ status: 201, description: 'Alias successfully mapped.' })
  create(@Body() createDto: CreateAliasDto) {
    return this.aliasesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'List mapped alias catalog' })
  findAll() {
    return this.aliasesService.findAll();
  }

  @Get('student/:studentId')
  @ApiOperation({ summary: 'Retrieve aliases for a student' })
  findByStudent(@Param('studentId') studentId: string) {
    return this.aliasesService.findByStudent(studentId);
  }

  @Get('resolve/:aliasText')
  @ApiOperation({ summary: 'Resolve student from chat alias' })
  resolveAlias(@Param('aliasText') aliasText: string) {
    return this.aliasesService.resolveAlias(aliasText);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete alias mapping' })
  remove(@Param('id') id: string) {
    return this.aliasesService.remove(id);
  }
}

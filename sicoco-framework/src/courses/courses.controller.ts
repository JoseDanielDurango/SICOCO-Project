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
import { CoursesService } from './courses.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new academic course' })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve courses with optional filters (semester, isActive)' })
  @ApiQuery({ name: 'semester', required: false, description: 'Academic semester e.g. 2026-2' })
  @ApiQuery({ name: 'isActive', required: false, type: Boolean })
  findAll(
    @Query('semester') semester?: string,
    @Query('isActive') isActive?: string,
  ) {
    const activeBool = isActive !== undefined ? isActive === 'true' : undefined;
    return this.coursesService.findAll(semester, activeBool);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Find course by institutional code' })
  findByCode(@Param('code') code: string) {
    return this.coursesService.findByCode(code);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve course details by ID' })
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id/toggle-active')
  @ApiOperation({ summary: 'Toggle course active status' })
  toggleActive(@Param('id') id: string) {
    return this.coursesService.toggleActive(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course details' })
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a course by ID' })
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}

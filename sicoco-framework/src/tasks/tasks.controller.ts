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
import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new collaborative formative task' })
  @ApiResponse({ status: 201, description: 'Task created successfully.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve task list with optional filters' })
  @ApiQuery({ name: 'teamId', required: false, type: String })
  @ApiQuery({ name: 'studentId', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['pending', 'in_progress', 'completed', 'overdue'] })
  @ApiQuery({ name: 'summaryId', required: false, type: String })
  findAll(
    @Query('teamId') teamId?: string,
    @Query('studentId') studentId?: string,
    @Query('status') status?: string,
    @Query('summaryId') summaryId?: string,
  ) {
    return this.tasksService.findAll({ teamId, studentId, status, summaryId });
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Retrieve task progress statistics and metrics' })
  @ApiQuery({ name: 'teamId', required: false, type: String })
  getMetrics(@Query('teamId') teamId?: string) {
    return this.tasksService.getMetrics(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve task details by ID' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task attributes' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Change task status (progress transition)' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'in_progress' | 'completed' | 'overdue',
  ) {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

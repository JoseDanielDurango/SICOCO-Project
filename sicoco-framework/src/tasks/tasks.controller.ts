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
  @ApiOperation({ summary: 'Crear una nueva tarea formativa colaborativa' })
  @ApiResponse({ status: 201, description: 'Tarea creada con éxito.' })
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Consultar listado de tareas con filtros opcionales' })
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
  @ApiOperation({ summary: 'Obtener métricas y estadísticas de avance de tareas' })
  @ApiQuery({ name: 'teamId', required: false, type: String })
  getMetrics(@Query('teamId') teamId?: string) {
    return this.tasksService.getMetrics(teamId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar tarea por ID' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar atributos de la tarea' })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Cambiar el estado de la tarea (transición de avance)' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'in_progress' | 'completed' | 'overdue',
  ) {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una tarea' })
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

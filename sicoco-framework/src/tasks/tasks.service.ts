import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const created = new this.taskModel({
      ...createTaskDto,
      dueDate: createTaskDto.dueDate ? new Date(createTaskDto.dueDate) : null,
    });
    return created.save();
  }

  async findAll(filters?: {
    teamId?: string;
    studentId?: string;
    status?: string;
    summaryId?: string;
  }): Promise<Task[]> {
    const query: Record<string, any> = {};
    if (filters?.teamId) query.teamId = filters.teamId;
    if (filters?.studentId) query.assignedStudentId = filters.studentId;
    if (filters?.status) query.status = filters.status;
    if (filters?.summaryId) query.summaryId = filters.summaryId;

    const tasks = await this.taskModel.find(query).sort({ dueDate: 1 }).exec();

    // Automated cron-like overdue check on retrieval
    const now = new Date();
    for (const t of tasks) {
      if (
        t.status !== 'completed' &&
        t.dueDate &&
        new Date(t.dueDate) < now &&
        t.status !== 'overdue'
      ) {
        t.status = 'overdue';
        await this.taskModel.findByIdAndUpdate(t._id, { status: 'overdue' });
      }
    }

    return tasks;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const payload: any = { ...updateTaskDto };
    if (updateTaskDto.dueDate) {
      payload.dueDate = new Date(updateTaskDto.dueDate);
    }
    if (updateTaskDto.status === 'completed') {
      payload.completedAt = new Date();
    }
    const updated = await this.taskModel
      .findByIdAndUpdate(id, payload, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updated;
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'in_progress' | 'completed' | 'overdue',
  ): Promise<Task> {
    const completedAt = status === 'completed' ? new Date() : null;
    const updated = await this.taskModel
      .findByIdAndUpdate(id, { status, completedAt }, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updated;
  }

  async getMetrics(teamId?: string): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    overdue: number;
    completionRate: number;
  }> {
    const query = teamId ? { teamId } : {};
    const tasks = await this.taskModel.find(query).exec();

    const total = tasks.length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const overdue = tasks.filter((t) => t.status === 'overdue').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      pending,
      inProgress,
      completed,
      overdue,
      completionRate,
    };
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.taskModel.findByIdAndDelete(id).exec();
    if (!res) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return { deleted: true };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';
import { UserAuthGuard } from 'src/auth/guards/user.auth.guard';
import { DeleteResult } from 'typeorm';
import { Task, TaskStatus } from '../models/task.interface';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  createTask(@Body() task: Task): Promise<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAllTask(): Promise<Task[]> {
    return this.taskService.findAllTask();
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  deleteTaskById(@Param('id') id: string): Promise<DeleteResult> {
    return this.taskService.deleteTaskById(id);
  }

  @Get('/user/:id')
  @UseGuards(UserAuthGuard)
  async findTaskByUserId(@Param('id') id: string): Promise<Task[]> {
    return await this.taskService.findTaskByUserId(id);
  }

  @Get('/project/:id')
  @UseGuards(AdminAuthGuard)
  async findTaskByProjectId(@Param('id') id: string): Promise<Task[]> {
    return await this.taskService.findTaskByProjectId(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  updateTaskById(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.updateTaskById(id, task);
  }

  @Put('status/:id')
  @UseGuards(UserAuthGuard)
  updateTaskStatusById(
    @Param('id') id: string,
    @Body('taskStatus') taskStatus: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatusbyId(id, taskStatus);
  }

  @Put('archive/:id')
  updateTaskArchiveById(
    @Param('id') id: string,
    @Body('isArchived') archive: boolean,
  ): Promise<Task> {
    return this.taskService.updateTaskArchiveById(id, archive);
  }
}

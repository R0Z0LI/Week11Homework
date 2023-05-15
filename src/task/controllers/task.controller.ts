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
import { Observable } from 'rxjs';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';
import { UserAuthGuard } from 'src/auth/guards/user.auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Task, TaskStatuse } from '../models/task.interface';
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
  deleteTaskById(@Param('id') id: number): Promise<DeleteResult> {
    return this.taskService.deleteTaskById(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  updateTaskById(@Param('id') id: number, @Body() task: Task): Promise<Task> {
    return this.taskService.updateTaskById(id, task);
  }

  @Put(':id')
  @UseGuards(UserAuthGuard)
  updateTaskStatusById(
    @Param('id') id: number,
    @Body() taskStatus: TaskStatuse,
  ): Promise<Task> {
    return this.taskService.updateTaskStatusbyId(id, taskStatus);
  }
}

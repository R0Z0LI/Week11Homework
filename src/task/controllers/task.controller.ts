import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Task } from '../models/task.interface';
import { TaskService } from '../services/task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createPost(@Body() task: Task): Observable<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  findAll(): Observable<Task[]> {
    return this.taskService.findAll();
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Observable<DeleteResult> {
    return this.taskService.deleteUserById(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: number,
    @Body() task: Task,
  ): Observable<UpdateResult> {
    return this.taskService.updateTaskById(id, task);
  }
}

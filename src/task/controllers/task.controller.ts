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
  createTask(@Body() task: Task): Observable<Task> {
    return this.taskService.createTask(task);
  }

  @Get()
  findAllTask(): Observable<Task[]> {
    return this.taskService.findAllTask();
  }

  @Delete(':id')
  deleteTaskById(@Param('id') id: number): Observable<DeleteResult> {
    return this.taskService.deleteTaskById(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: number,
    @Body() task: Task,
  ): Observable<UpdateResult> {
    return this.taskService.updateTaskById(id, task);
  }
}

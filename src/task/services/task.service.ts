import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from '../models/task.entity';
import { Task, TaskStatuse } from '../models/task.interface';
import { TaskTransformer } from '../transformer/task.transformer';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    private taskTransformer: TaskTransformer,
  ) {}

  createTask(task: Task): Observable<Task> {
    return from(this.taskRepository.save(task));
  }

  findAllTask(): Observable<Task[]> {
    return from(this.taskRepository.find());
  }

  async findTaskById(id: number): Promise<Task> {
    const taskEntity = await this.taskRepository.findOne({ where: { id: id } });
    const task = this.taskTransformer.entityToObject(taskEntity);
    return this.taskTransformer.entityToObject(taskEntity);
  }

  deleteTaskById(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete(id));
  }

  updateTaskById(id: number, task: Task): Observable<UpdateResult> {
    return from(this.taskRepository.update(id, task));
  }

  async updateTaskStatus(
    id: number,
    taskSTatus: TaskStatuse,
  ): Promise<UpdateResult> {
    const task = await this.findTaskById(id);
    task.status = taskSTatus;
    return this.taskRepository.update(id, task);
  }
}

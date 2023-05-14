import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
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
    const taskEntity = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['userId'],
    });
    return this.taskTransformer.entityToObject(taskEntity);
  }

  deleteTaskById(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete(id));
  }

  async findTaskByUserId(id: number): Promise<Task[]> {
    return await this.taskRepository
      .createQueryBuilder('task')
      .where('task.userId = :userId', { userId: id })
      .getMany();
  }

  async updateTaskById(id: number, task: Task): Promise<Task> {
    const foundTask = await this.findTaskById(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.save({ id: foundTask.id, ...task });
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

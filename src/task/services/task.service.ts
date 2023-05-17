import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from '../models/task.entity';
import { Task, TaskStatus } from '../models/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(task: Task): Promise<Task> {
    return await this.taskRepository.save(task);
  }

  async findAllTask(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async findTaskById(id: number): Promise<Task> {
    const taskEntity = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['userId'],
    });
    return taskEntity;
  }

  async deleteTaskById(id: number): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
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

  async updateTaskStatusbyId(
    id: number,
    taskStatus: TaskStatus,
  ): Promise<Task> {
    const task = await this.findTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.status = taskStatus;
    return this.taskRepository.save(task);
  }
}

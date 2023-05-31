import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../../project/models/project.entity';
import { UserEntity } from '../../user/models/user.entity';
import { TaskEntity } from '../models/task.entity';
import { Task, TaskStatus } from '../models/task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async createTask(task: Task): Promise<Task> {
    console.log(task);
    const user = await this.userRepository.findOne({
      where: { id: task.user.id },
    });
    const project = await this.projectRepository.findOne({
      where: { id: task.project.id },
    });
    task.user = user;
    task.project = project;
    return await this.taskRepository.save(task);
  }

  async findAllTask(): Promise<Task[]> {
    return await this.taskRepository.find({ relations: ['user', 'project'] });
  }

  async findTaskById(id: string): Promise<Task> {
    const taskEntity = await this.taskRepository.findOne({
      where: { id: id },
      relations: ['user', 'project'],
    });
    return taskEntity;
  }

  async deleteTaskById(id: string): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }

  async findTaskByUserId(id: string): Promise<Task[]> {
    const tasks = await this.findAllTask();

    console.log(id);
    const filteredTasks = tasks.filter((task) => {
      console.log(task.user.id);
      return task.user.id === id;
    });
    console.log(filteredTasks);
    return filteredTasks;
  }

  async findTaskByProjectId(id: string): Promise<Task[]> {
    const tasks = await this.findAllTask();
    const numberId = id;
    const filteredTasks = tasks.filter((task) => {
      return task.project.id === numberId;
    });
    return filteredTasks;
  }

  async updateTaskById(id: string, task: Task): Promise<Task> {
    const foundTask = await this.findTaskById(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return await this.taskRepository.save({ id: foundTask.id, ...task });
  }

  async updateTaskArchiveById(id: string, archive: boolean): Promise<Task> {
    const foundTask = await this.findTaskById(id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    foundTask.isArchived = archive;
    return this.taskRepository.save({ id: foundTask.id, ...foundTask });
  }

  async updateTaskStatusbyId(
    id: string,
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

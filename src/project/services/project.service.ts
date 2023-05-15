import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskService } from 'src/task/services/task.service';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Project, ProjectStatuse } from '../models/project.interface';
import { ProjectTransformer } from '../transformer/project.transformer';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private projectTransformer: ProjectTransformer,
    private readonly taskService: TaskService,
  ) {}

  async createProject(project: Project, users?: User[]): Promise<Project> {
    const foundUsers = [];
    if (users && users.length > 0) {
      for (const user of users) {
        const foundUser = await this.userRepository.findOne({
          where: { id: user.id },
        });
        if (!foundUser) {
          throw new NotFoundException(`User with ID ${user.id} not found`);
        }
        foundUsers.push(foundUser);
      }
    }
    project.users = foundUsers;
    return await this.projectRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find();
  }

  async deleteProjectById(id: number): Promise<DeleteResult> {
    return await this.projectRepository.delete(id);
  }

  async updateProjectById(id: number, project: Project): Promise<UpdateResult> {
    return await this.projectRepository.update(id, project);
  }

  async findProjectById(id: number): Promise<Project> {
    const projectEntity = await this.projectRepository.findOne({
      where: { id: id },
    });
    return this.projectTransformer.entityToObject(projectEntity);
  }

  async addTaskById(projectId: number, taskId: number) {
    const project = await this.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const task = await this.taskService.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const tasks = project.tasks || [];
    tasks.push(task);
    project.tasks = tasks;
    return await this.projectRepository.save(project);
  }

  async updateTaskStatusbyId(
    id: number,
    projectStatus: ProjectStatuse,
  ): Promise<Project> {
    const task = await this.findProjectById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    task.status = projectStatus;
    return this.projectRepository.save(task);
  }
}

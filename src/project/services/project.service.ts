import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskService } from 'src/task/services/task.service';
import { UserEntity } from 'src/user/models/user.entity';
import { User } from 'src/user/models/user.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Project, ProjectStatus } from '../models/project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
    return await this.projectRepository.find({ relations: ['manager'] });
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
    return projectEntity;
  }

  async updateProjectArchiveById(
    projectId: number,
    archive: boolean,
  ): Promise<Project> {
    const foundProject = await this.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    foundProject.isArchived = archive;
    return await this.projectRepository.save({
      id: foundProject.id,
      ...foundProject,
    });
  }

  async addTaskById(projectId: number, taskId: number) {
    const foundProject = await this.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const task = await this.taskService.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const tasks = foundProject.tasks || [];
    tasks.push(task);
    foundProject.tasks = tasks;
    return await this.projectRepository.save(foundProject);
  }

  async updateProjectStatusbyId(
    id: number,
    projectStatus: ProjectStatus,
  ): Promise<Project> {
    const foundProject = await this.findProjectById(id);
    if (!foundProject) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    foundProject.status = projectStatus;
    return this.projectRepository.save(foundProject);
  }
}

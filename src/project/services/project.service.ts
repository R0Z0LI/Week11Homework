import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { TaskService } from 'src/task/services/task.service';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Project } from '../models/project.interface';
import { ProjectTransformer } from '../transformer/project.transformer';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    private projectTransformer: ProjectTransformer,
    private readonly taskService: TaskService,
  ) {}

  createProject(project: Project): Observable<Project> {
    return from(this.projectRepository.save(project));
  }

  findAll(): Observable<Project[]> {
    return from(this.projectRepository.find());
  }

  deleteProjectById(id: number): Observable<DeleteResult> {
    return from(this.projectRepository.delete(id));
  }

  updateProjectById(id: number, project: Project): Observable<UpdateResult> {
    return from(this.projectRepository.update(id, project));
  }

  async findProjectById(id: number): Promise<Project> {
    const userEntity = await this.projectRepository.findOne({
      where: { id: id },
    });
    return this.projectTransformer.entityToObject(userEntity);
  }

  async addTaskById(projectId: number, taskId: number) {
    const project = await this.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const task = await this.taskService.findTaskById(taskId);
    const tasks = [];
    tasks.push(task);
    project.tasks = tasks;
    return await this.projectRepository.save(project);
  }
}

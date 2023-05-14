import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
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
}

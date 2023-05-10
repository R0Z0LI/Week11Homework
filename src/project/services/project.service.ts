import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../models/project.entity';
import { Project } from '../models/project.interface';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
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
}

import { ProjectEntity } from '../models/project.entity';
import { Project } from '../models/project.interface';
import { Injectable } from '@nestjs/common';

export class ProjectTransformer {
  entityToObject(projectEntity: ProjectEntity): Project {
    const project: Project = {
      id: projectEntity.id,
      name: projectEntity.name,
      description: projectEntity.description,
      status: projectEntity.status,
      users: projectEntity.users,
      tasks: projectEntity.tasks,
      manager: projectEntity.manager,
    };
    return project;
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Project, ProjectStatus } from '../models/project.interface';
import { ProjectService } from '../services/project.service';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';
import { User } from 'src/user/models/user.interface';

@Controller('project')
@UseGuards(AdminAuthGuard)
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(
    @Body() data: { project: Project; users?: User[] },
  ): Promise<Project> {
    return this.projectService.createProject(data.project, data.users);
  }

  @Get()
  findAllProject(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Delete(':id')
  deleteProjectById(@Param('id') id: string): Promise<DeleteResult> {
    return this.projectService.deleteProjectById(id);
  }

  @Put(':id')
  updateProjectById(
    @Param('id') id: string,
    @Body() project: Project,
  ): Promise<Project> {
    return this.projectService.updateProjectById(id, project);
  }

  @Put('archive/:id')
  archiveProjectById(
    @Param('id') id: string,
    @Body('isArchived') isArchived: boolean,
  ): Promise<Project> {
    return this.projectService.updateProjectArchiveById(id, isArchived);
  }

  @Put('task/:projectId/:taskId')
  addTaskById(
    @Param('projectId') projectId: string,
    @Param('taskId') taskId: string,
  ) {
    return this.projectService.addTaskById(projectId, taskId);
  }

  @Put('status/:id')
  updateProjectStatusById(
    @Param('id') id: string,
    @Body('status') projectStatus: ProjectStatus,
  ): Promise<Project> {
    return this.projectService.updateProjectStatusbyId(id, projectStatus);
  }
}

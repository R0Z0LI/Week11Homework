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
import { Project, ProjectStatuse } from '../models/project.interface';
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
  deleteProjectById(@Param('id') id: number): Promise<DeleteResult> {
    return this.projectService.deleteProjectById(id);
  }

  @Put(':id')
  updateProjectById(
    @Param('id') id: number,
    @Body() project: Project,
  ): Promise<UpdateResult> {
    return this.projectService.updateProjectById(id, project);
  }

  @Put('task/:projectId/:taskId')
  addTaskById(
    @Param('projectId') projectId: number,
    @Param('taskId') taskId: number,
  ) {
    return this.projectService.addTaskById(projectId, taskId);
  }

  @Put('status/:id')
  updateTaskStatusById(
    @Param('id') id: number,
    @Body('status') projectStatus: ProjectStatuse,
  ): Promise<Project> {
    return this.projectService.updateTaskStatusbyId(id, projectStatus);
  }
}

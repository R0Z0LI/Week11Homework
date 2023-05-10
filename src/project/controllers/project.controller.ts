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
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Project } from '../models/project.interface';
import { ProjectService } from '../services/project.service';
import { UserAuthGuard } from 'src/auth/guards/user.auth.guard';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  createProject(@Body() project: Project): Observable<Project> {
    return this.projectService.createProject(project);
  }

  @Get()
  @UseGuards(UserAuthGuard)
  findAllProject(): Observable<Project[]> {
    return this.projectService.findAll();
  }

  @Delete(':id')
  deleteProjectById(@Param('id') id: number): Observable<DeleteResult> {
    return this.projectService.deleteProjectById(id);
  }

  @Put(':id')
  updateProjectById(
    @Param('id') id: number,
    @Body() project: Project,
  ): Observable<UpdateResult> {
    return this.projectService.updateProjectById(id, project);
  }
}

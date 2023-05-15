import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';
import { Project } from 'src/project/models/project.interface';
import { Task } from 'src/task/models/task.interface';

@Controller('user')
@UseGuards(AdminAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.updateUserById(id, user);
  }

  @Put('role/:id')
  updateRoleById(
    @Param('id') id: number,
    @Body() admin: boolean,
  ): Promise<User> {
    return this.userService.updateUserRole(id, admin);
  }

  @Put('task/:id/:taskId')
  addTaskById(
    @Param('id') id: number,
    @Param('taskId') taskId: number,
  ): Promise<User> {
    return this.userService.addTaskById(id, taskId);
  }

  @Put('project/:id/:projectId')
  addProjectById(
    @Param('id') id: number,
    @Param('projectId') projectId: number,
  ): Promise<User> {
    return this.userService.addProjectById(id, projectId);
  }

  @Put('/managed/:id/:projectId')
  addManagedProjectById(
    @Param('id') id: number,
    @Param('projectId') projectId: number,
  ): Promise<User> {
    return this.userService.addManagedProjectById(id, projectId);
  }

  @Put('remove/:id/:projectId')
  removeProjectById(
    @Param('id') id: number,
    @Param('projectId') projectId: number,
  ): Promise<User> {
    return this.userService.removeUserFromProject(id, projectId);
  }
}

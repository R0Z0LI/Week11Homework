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
import { DeleteResult } from 'typeorm';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';
import { UserAuthGuard } from '../../auth/guards/user.auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AdminAuthGuard)
  createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get()
  @UseGuards(AdminAuthGuard)
  findAllUser(): Promise<User[]> {
    return this.userService.findAllUser();
  }

  @Get(':id')
  @UseGuards(UserAuthGuard)
  findUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  deleteUserById(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  updateUserById(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.updateUserById(id, user);
  }

  @Put('role/:id')
  @UseGuards(AdminAuthGuard)
  updateRoleById(
    @Param('id') id: string,
    @Body() admin: boolean,
  ): Promise<User> {
    return this.userService.updateUserRole(id, admin);
  }

  @Put('suspend/:id')
  @UseGuards(AdminAuthGuard)
  updateSuspendById(
    @Param('id') id: string,
    @Body() suspendData: { suspend: boolean },
  ): Promise<User> {
    return this.userService.updateUserSuspended(id, suspendData.suspend);
  }

  @Put('task/:id/:taskId')
  @UseGuards(AdminAuthGuard)
  addTaskById(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ): Promise<User> {
    return this.userService.addTaskById(id, taskId);
  }

  @Put('project/:id/:projectId')
  @UseGuards(AdminAuthGuard)
  addProjectById(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
  ): Promise<User> {
    return this.userService.addProjectById(id, projectId);
  }

  @Put('/managed/:id/:projectId')
  @UseGuards(AdminAuthGuard)
  addManagedProjectById(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
  ): Promise<User> {
    return this.userService.addManagedProjectById(id, projectId);
  }

  @Put('remove/project/:id/:projectId')
  @UseGuards(AdminAuthGuard)
  removeProjectById(
    @Param('id') id: string,
    @Param('projectId') projectId: string,
  ): Promise<User> {
    return this.userService.removeUserFromProject(id, projectId);
  }

  @Put('remove/task/:id/:projectId')
  removeTaskById(
    @Param('id') id: string,
    @Param('taskId') taskId: string,
  ): Promise<User> {
    return this.userService.removeUserFromTask(id, taskId);
  }

  @Put('remove/managed/:id/:projectId')
  @UseGuards(AdminAuthGuard)
  removeManagedProjectById(
    @Param('id') id: string,
    @Param('taskId') projectId: string,
  ): Promise<User> {
    return this.userService.removeUserFromManagedProject(id, projectId);
  }
}

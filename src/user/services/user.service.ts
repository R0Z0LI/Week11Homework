import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { TaskService } from 'src/task/services/task.service';
import { ProjectService } from 'src/project/services/project.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  async createUser(user: User): Promise<User> {
    const hashedPassword = crypto
      .createHash('sha256')
      .update(user.password)
      .digest('hex');
    user.password = hashedPassword;
    return await this.userRepository.save(user);
  }

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const userEntity = await this.userRepository.findOne({
      where: { email: email },
    });
    return userEntity;
  }

  async findUserById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async deleteUserById(id: number): Promise<DeleteResult> {
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const projects = foundUser.projects || [];
    projects.forEach((element) => {
      this.removeUserFromProject(id, element.id);
    });
    const tasks = foundUser.tasks || [];
    tasks.forEach((element) => {
      this.removeUserFromTask(id, element.id);
    });
    const managedProjects = foundUser.managedProjects || [];
    managedProjects.forEach((element) => {
      this.removeUserFromManagedProject(id, element.id);
    });
    return this.userRepository.delete(id);
  }

  async updateUserById(id: number, user: User): Promise<User> {
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const hashedPassword = crypto
      .createHash('sha256')
      .update(user.password)
      .digest('hex');
    user.password = hashedPassword;
    return await this.userRepository.save({ id: foundUser.id, ...user });
  }

  async updateUserLoginDate(user: User): Promise<User> {
    user.lastLogin = new Date();
    return await this.userRepository.save({ id: user.id, ...user });
  }

  async updateUserSuspended(id: number, suspended: boolean): Promise<User> {
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    foundUser.isSuspended = suspended;
    return await this.userRepository.save({ id: foundUser.id, ...foundUser });
  }

  async updateUserRole(id: number, admin: boolean): Promise<User> {
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    foundUser.isAdmin = admin;
    return await this.userRepository.save({ id: foundUser.id, ...foundUser });
  }

  async addTaskById(id: number, taskId: number): Promise<User> {
    const foundTask = await this.taskService.findTaskById(taskId);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const foundUser = await this.userRepository.findOne({
      where: { id: id },
      relations: ['tasks', 'projects', 'managedProjects'],
    });

    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    foundUser.tasks.push(foundTask);
    return await this.userRepository.save(foundUser);
  }

  async addProjectById(id: number, projectId: number): Promise<User> {
    const foundProject = await this.projectService.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const projects = foundUser.projects || [];
    projects.push(foundProject);
    foundUser.projects = projects;
    return await this.userRepository.save(foundUser);
  }

  async removeUserFromProject(
    userId: number,
    projectId: number,
  ): Promise<User> {
    const foundProject = await this.projectService.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const foundUser = await this.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const projects = foundUser.projects || [];
    const updatedProjects = projects.filter((p) => p.id !== foundProject.id);
    foundUser.projects = updatedProjects;
    return await this.userRepository.save(foundUser);
  }

  async removeUserFromTask(userId: number, taskId: number): Promise<User> {
    const foundTask = await this.taskService.findTaskById(taskId);
    if (!foundTask) {
      throw new NotFoundException(`Project with ID ${foundTask} not found`);
    }
    const foundUser = await this.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const tasks = foundUser.tasks || [];
    const updatedTasks = tasks.filter((t) => foundTask.id !== taskId);
    foundUser.tasks = updatedTasks;
    return await this.userRepository.save(foundUser);
  }

  async removeUserFromManagedProject(
    userId: number,
    projectId: number,
  ): Promise<User> {
    const foundProject = await this.projectService.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const foundUser = await this.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const managedProjects = foundUser.managedProjects || [];
    const updatedProjects = managedProjects.filter((p) => p.id !== projectId);
    foundUser.managedProjects = updatedProjects;
    return await this.userRepository.save(foundUser);
  }

  async addManagedProjectById(id: number, projectId: number): Promise<User> {
    const foundProject = await this.projectService.findProjectById(projectId);
    if (!foundProject) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const foundUser = await this.findUserById(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!foundUser.isAdmin) {
      throw new NotAuthorizedException(
        'The user you are tring to assign as a manager is not an admin',
      );
    }
    const managedProjects = foundUser.managedProjects || [];
    managedProjects.push(foundProject);
    foundUser.managedProjects = managedProjects;
    return this.userRepository.save(foundUser);
  }
}

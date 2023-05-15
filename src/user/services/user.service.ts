import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { userTransformer } from '../transformer/user.transformer';
import { TaskService } from 'src/task/services/task.service';
import { ProjectService } from 'src/project/services/project.service';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userTransformer: userTransformer,
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

  async findUserByEmail(email: string): Promise<User> {
    const userEntity = await this.userRepository.findOne({
      where: { email: email },
    });
    return this.userTransformer.entityToObject(userEntity);
  }

  async findUserById(id: number): Promise<User> {
    const userEntity = await this.userRepository.findOne({ where: { id: id } });
    return this.userTransformer.entityToObject(userEntity);
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
    return await this.userRepository.save({ id: foundUser.id, ...user });
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
    const task = await this.taskService.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['tasks', 'projects', 'managedProjects'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.tasks.push(task);
    return await this.userRepository.save(user);
  }

  async addProjectById(id: number, projectId: number): Promise<User> {
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const user = await this.findUserById(id);
    const projects = user.projects || [];
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    projects.push(project);
    user.projects = projects;
    return await this.userRepository.save(user);
  }

  async removeUserFromProject(
    userId: number,
    projectId: number,
  ): Promise<User> {
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const projects = user.projects || [];
    const updatedProjects = projects.filter((p) => p.id !== projectId);
    user.projects = updatedProjects;
    return await this.userRepository.save(user);
  }

  async removeUserFromTask(userId: number, taskId: number): Promise<User> {
    const task = await this.taskService.findTaskById(taskId);
    if (!task) {
      throw new NotFoundException(`Project with ID ${task} not found`);
    }
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const tasks = user.tasks || [];
    const updatedTasks = tasks.filter((t) => task.id !== taskId);
    user.tasks = updatedTasks;
    return await this.userRepository.save(user);
  }

  async removeUserFromManagedProject(
    userId: number,
    projectId: number,
  ): Promise<User> {
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const managedProjects = user.managedProjects || [];
    const updatedProjects = managedProjects.filter((p) => p.id !== projectId);
    user.managedProjects = updatedProjects;
    return await this.userRepository.save(user);
  }

  async addManagedProjectById(id: number, projectId: number): Promise<User> {
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (!user.isAdmin) {
      throw new NotAuthorizedException(
        'The user you are tring to assign as a manager is not an admin',
      );
    }
    const managedProjects = user.managedProjects || [];
    managedProjects.push(project);
    user.managedProjects = managedProjects;
    return this.userRepository.save(user);
  }
}

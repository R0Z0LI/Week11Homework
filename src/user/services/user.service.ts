import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { Task } from 'src/task/models/task.interface';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { userTransformer } from '../transformer/user.transformer';
import { Project } from 'src/project/models/project.interface';
import { TaskService } from 'src/task/services/task.service';
import { ProjectService } from 'src/project/services/project.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userTransformer: userTransformer,
    private readonly taskService: TaskService,
    private readonly projectService: ProjectService,
  ) {}

  createUser(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findAllUser(): Observable<User[]> {
    return from(this.userRepository.find());
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

  deleteUserById(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
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
    const projects = [];
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    projects.push(project);
    user.projects = projects;
    return await this.userRepository.save(user);
  }

  async addManagedProjectById(
    id: number,
    projectId: number,
  ): Promise<UpdateResult> {
    const project = await this.projectService.findProjectById(projectId);
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    const user = await this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    project.manager = user;
    this.projectService.updateProjectById(projectId, project);
    user.managedProjects.push(project);
    return this.userRepository.update(id, user);
  }
}

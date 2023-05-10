import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createUser(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findAllUser(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  async findUserByEmail(email: string): Promise<User> {
    //const userEntity = await this.userRepository.findOne({ where: { email } });
    const userEntity = await this.userRepository.findOne({
      where: { email: 'john@example.com' },
    });
    console.log(userEntity);
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      isAdmin: userEntity.isAdmin,
      projects: userEntity.projects,
      tasks: userEntity.tasks,
      managedProjects: userEntity.managedProjects,
    };
    if (user.email == email) {
      console.log('TRUE');
    } else {
      console.log('FALSE');
    }
    return user;
  }

  deleteUserById(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  updateUserById(id: number, user: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }
}

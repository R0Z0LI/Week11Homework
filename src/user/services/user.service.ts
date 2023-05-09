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

  deleteUserById(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  updateUserById(id: number, user: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }
}

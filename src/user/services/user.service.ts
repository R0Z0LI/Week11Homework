import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createPost(user: User): Observable<User> {
    return from(this.userRepository.save(user));
  }

  findAllUser(): Observable<User[]> {
    return from(this.userRepository.find());
  }

  deleteUserById(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }
}

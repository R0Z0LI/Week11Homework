import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';
import { userTransformer } from '../transformer/user.transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private userTransformer: userTransformer,
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

  deleteUserById(id: number): Observable<DeleteResult> {
    return from(this.userRepository.delete(id));
  }

  updateUserById(id: number, user: User): Observable<UpdateResult> {
    return from(this.userRepository.update(id, user));
  }
}

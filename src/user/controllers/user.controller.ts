import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { Observable, from } from 'rxjs';
import { DeleteResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userService.createPost(user);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUser();
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUserById(id);
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User> {
    return this.userService.createUser(user);
  }

  @Get()
  findAll(): Observable<User[]> {
    return this.userService.findAllUser();
  }

  @Delete(':id')
  deleteById(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: number,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUserById(id, user);
  }
}

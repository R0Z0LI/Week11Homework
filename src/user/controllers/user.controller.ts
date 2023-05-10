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
import { Observable, from } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AdminAuthGuard } from 'src/auth/guards/admin.auth.guard';

@Controller('user')
@UseGuards(AdminAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  createUser(@Body() user: User): Observable<User> {
    return this.userService.createUser(user);
  }

  @Get()
  findAllUser(): Observable<User[]> {
    return this.userService.findAllUser();
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number): Observable<DeleteResult> {
    return this.userService.deleteUserById(id);
  }

  @Put(':id')
  updateUserById(
    @Param('id') id: number,
    @Body() user: User,
  ): Observable<UpdateResult> {
    return this.userService.updateUserById(id, user);
  }
}

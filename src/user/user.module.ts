import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { TaskModule } from 'src/task/task.module';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';

@Module({
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity]), ProjectModule, TaskModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

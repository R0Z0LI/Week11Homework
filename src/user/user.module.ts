import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from 'src/project/project.module';
import { ProjectService } from 'src/project/services/project.service';
import { TaskService } from 'src/task/services/task.service';
import { TaskModule } from 'src/task/task.module';
import { UserController } from './controllers/user.controller';
import { UserEntity } from './models/user.entity';
import { UserService } from './services/user.service';
import { userTransformer } from './transformer/user.transformer';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ProjectModule, TaskModule],
  exports: [UserService],
  providers: [UserService, userTransformer],
  controllers: [UserController],
})
export class UserModule {}

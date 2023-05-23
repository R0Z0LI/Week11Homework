import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskEntity } from './models/task.entity';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from '../project/models/project.entity';
import { UserEntity } from '../user/models/user.entity';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';

@Module({
  exports: [TaskService],
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    TypeOrmModule.forFeature([ProjectEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}

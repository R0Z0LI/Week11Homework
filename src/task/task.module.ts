import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TaskEntity } from './models/task.entity';
import { TaskService } from './services/task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTransformer } from './transformer/task.transformer';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService, TaskTransformer],
})
export class TaskModule {}

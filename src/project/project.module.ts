import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { ProjectEntity } from './models/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTransformer } from './transformer/project.transformer';
import { TaskModule } from 'src/task/task.module';
import { UserEntity } from 'src/user/models/user.entity';
@Module({
  exports: [ProjectService],
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    TaskModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [ProjectService, ProjectTransformer],
  controllers: [ProjectController],
})
export class ProjectModule {}

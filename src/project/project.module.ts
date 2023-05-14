import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';
import { ProjectEntity } from './models/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTransformer } from './transformer/project.transformer';
import { TaskModule } from 'src/task/task.module';

@Module({
  exports: [ProjectService],
  imports: [TypeOrmModule.forFeature([ProjectEntity]), TaskModule],
  providers: [ProjectService, ProjectTransformer],
  controllers: [ProjectController],
})
export class ProjectModule {}

import { Module } from '@nestjs/common';
import { ProjectService } from './services/project.service';
import { ProjectController } from './controllers/project.controller';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule {}

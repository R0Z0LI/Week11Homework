import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { TaskStatus } from './task.interface';
import { Project } from 'src/project/models/project.interface';
import { ProjectEntity } from 'src/project/models/project.entity';
import { UserEntity } from 'src/user/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('task')
export class TaskEntity {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ManyToOne(() => ProjectEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectEntity;
}

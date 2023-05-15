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

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  userId: User;

  @Column({
    type: 'enum',
    enum: TaskStatus,
  })
  status: TaskStatus;

  @ManyToOne(() => ProjectEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'project_id',
  })
  projectId: ProjectEntity;
}

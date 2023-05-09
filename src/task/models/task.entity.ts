import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { TaskStatuse } from './task.interface';
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

  @ManyToOne(() => UserEntity, (user) => user.tasks)
  user: User;
  @JoinColumn({
    name: 'taskId',
  })
  taskId: TaskEntity;

  @Column({
    type: 'enum',
    enum: TaskStatuse,
  })
  status: TaskStatuse;

  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  projectId: ProjectEntity;
}

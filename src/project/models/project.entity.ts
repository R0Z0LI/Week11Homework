import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { Task } from 'src/task/models/task.interface';
import { ProjectStatuse } from './project.interface';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: ProjectStatuse;

  @Column({
    type: 'simple-array',
    default: [],
  })
  users: User[];

  @Column({
    type: 'simple-array',
    default: [],
  })
  tasks: Task[];

  @Column()
  manager: User;
}

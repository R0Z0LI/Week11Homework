import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { TaskStatuse } from './task.interface';
import { Project } from 'src/project/models/project.interface';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  user: User;

  @Column()
  status: TaskStatuse;

  @Column()
  project: Project;
}

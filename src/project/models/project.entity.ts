import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { Task } from './project.interface';
@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 'to-do' })
  status: string;

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

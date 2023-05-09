import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Task } from 'src/task/models/task.interface';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    unique: true,
  })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({
    type: 'simple-array',
    default: [],
  })
  tasks: Task[];
}

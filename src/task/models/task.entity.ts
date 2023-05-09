import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { User } from 'src/user/models/user.interface';

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

  @Column({ default: 'to-do' })
  status: string;
}

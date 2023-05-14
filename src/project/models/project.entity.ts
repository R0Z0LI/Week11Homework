import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from 'src/user/models/user.interface';
import { Task } from 'src/task/models/task.interface';
import { ProjectStatuse } from './project.interface';
import { TaskEntity } from 'src/task/models/task.entity';
import { UserEntity } from 'src/user/models/user.entity';

@Entity('project')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: ProjectStatuse,
  })
  status: ProjectStatuse;

  @ManyToMany(() => UserEntity, (user) => user.projects)
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.projectId, { cascade: true })
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  manager: UserEntity;
}

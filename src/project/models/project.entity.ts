import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
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
  @JoinColumn()
  users: UserEntity[];

  @OneToMany(() => TaskEntity, (task) => task.projectId)
  @Column({
    type: 'simple-array',
    default: [],
  })
  tasks: TaskEntity[];

  @ManyToOne(() => UserEntity, (user) => user.managedProjects)
  @JoinColumn({
    name: 'managerId',
  })
  manager: UserEntity;
}

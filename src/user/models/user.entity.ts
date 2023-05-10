import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { TaskEntity } from 'src/task/models/task.entity';
import { ProjectEntity } from 'src/project/models/project.entity';
import { Project } from 'src/project/models/project.interface';
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

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  @Column({
    nullable: true,
    type: 'simple-array',
    default: null,
  })
  projects: Project[];

  @OneToMany(() => TaskEntity, (task) => task.userId)
  @Column({
    nullable: true,
    type: 'simple-array',
    default: null,
  })
  tasks: Task[];

  @OneToMany(() => ProjectEntity, (project) => project.manager)
  @Column({
    nullable: true,
    type: 'simple-array',
    default: null,
  })
  managedProjects: Project[];
}

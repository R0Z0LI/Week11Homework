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
    type: 'simple-array',
    default: [],
  })
  projects: ProjectEntity[];

  @OneToMany(() => TaskEntity, (task) => task.taskId)
  @Column({
    type: 'simple-array',
    default: [],
  })
  tasks: TaskEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.manager)
  @Column({
    type: 'simple-array',
    default: [],
  })
  managedProjects: ProjectEntity[];
}

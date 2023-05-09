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
import { ProjectEntity } from 'src/project/modles/project.entity';

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
  projects: ProjectEntity[];

  @OneToMany(() => TaskEntity, (task) => task.userId)
  @Column({
    nullable: true,
    type: 'simple-array',
    default: null,
  })
  tasks: TaskEntity[];

  @OneToMany(() => ProjectEntity, (project) => project.manager)
  @Column({
    nullable: true,
    type: 'simple-array',
    default: null,
  })
  managedProjects: ProjectEntity[];
}

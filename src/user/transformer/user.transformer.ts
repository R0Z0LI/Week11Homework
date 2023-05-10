import { UserEntity } from '../models/user.entity';
import { User } from '../models/user.interface';

export class userTransformer {
  entityToObject(userEntity: UserEntity) {
    const user: User = {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
      password: userEntity.password,
      isAdmin: userEntity.isAdmin,
      projects: userEntity.projects,
      tasks: userEntity.tasks,
      managedProjects: userEntity.managedProjects,
    };
    return user;
  }
}

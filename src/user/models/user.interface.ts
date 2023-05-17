import { Project } from 'src/project/models/project.interface';
import { Task } from 'src/task/models/task.interface';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  lastLogin: Date;
  isSuspended: boolean;
  isAdmin: boolean;
  projects?: Project[];
  tasks?: Task[];
  managedProjects?: Project[];
}

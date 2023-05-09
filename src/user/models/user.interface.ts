import { Project } from 'src/project/modles/project.interface';
import { Task } from 'src/task/models/task.interface';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  isAdmin: boolean;
  projects?: Project[];
  tasks?: Task[];
  managedProjects?: Project[];
}

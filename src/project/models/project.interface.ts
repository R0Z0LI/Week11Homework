import { User } from 'src/user/models/user.interface';
import { Task } from 'src/task/models/task.interface';

export enum ProjectStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  isArchived: boolean;
  status?: ProjectStatus;
  users?: User[];
  tasks?: Task[];
  manager?: User;
}

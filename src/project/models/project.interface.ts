import { User } from 'src/user/models/user.interface';
import { Task } from 'src/task/models/task.interface';

export enum ProjectStatuse {
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  status?: ProjectStatuse;
  users?: User[];
  tasks?: Task[];
  manager?: User;
}

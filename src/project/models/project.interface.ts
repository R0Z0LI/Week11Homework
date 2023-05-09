import { User } from 'src/user/models/user.interface';

export interface Task {
  id?: number;
  name?: string;
  description?: string;
  status?: 'to-do' | 'in progress' | 'done';
  users?: User[];
  tasks?: Task[];
  manager?: User;
}

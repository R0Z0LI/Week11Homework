import { User } from 'src/user/models/user.interface';

export interface Task {
  id?: number;
  name?: string;
  description?: string;
  user?: User;
  status?: 'to-do' | 'in progress' | 'done';
}

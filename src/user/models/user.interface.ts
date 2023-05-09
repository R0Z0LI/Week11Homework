import { Task } from 'src/task/models/task.interface';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  isAdmin: boolean;
  tasks?: Task[];
}

import { User } from 'src/user/models/user.interface';

import { Project } from 'src/project/modles/project.interface';

export enum TaskStatuse {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Task {
  id?: number;
  name?: string;
  description?: string;
  user?: User;
  status?: TaskStatuse;
  project?: Project;
}

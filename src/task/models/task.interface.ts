import { User } from 'src/user/models/user.interface';

import { Project } from 'src/project/models/project.interface';

export enum TaskStatus {
  TODO = 'to-do',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export interface Task {
  id?: number;
  name?: string;
  description?: string;
  isArchived: boolean;
  user?: User;
  status?: TaskStatus;
  project?: Project;
}

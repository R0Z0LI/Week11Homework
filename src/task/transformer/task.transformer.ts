import { TaskEntity } from '../models/task.entity';
import { Task } from '../models/task.interface';

export class TaskTransformer {
  entityToObject(taskEntity: TaskEntity): Task {
    const task: Task = {
      id: taskEntity.id,
      name: taskEntity.name,
      description: taskEntity.description,
      user: taskEntity.userId,
      status: taskEntity.status,
      project: taskEntity.projectId,
    };
    return task;
  }
}

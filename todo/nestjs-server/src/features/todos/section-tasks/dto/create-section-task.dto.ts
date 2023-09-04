import { ProjectTask } from '@features/todos/project-tasks/entities/project-task.entity';
import { Task } from '@features/todos/tasks/entities/task.entity';

export class CreateSectionTaskDto {
  sectionTaskReq: {
    title: string;
    tasks: Task[];
    projectTask: ProjectTask;
    index: number;
  };
  sectionTaskUpdateIndex: {
    id: number;
    index: number;
  }[];
}

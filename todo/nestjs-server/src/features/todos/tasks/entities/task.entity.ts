import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/base.entity';
import { SectionTask } from '../../section-tasks/entities/section-task.entity';
import { ProjectTask } from '../../project-tasks/entities/project-task.entity';
import { ETaskPriority } from '@features/todos/tasks/enum/task.enum';

@Entity()
export class Task extends BaseEntity {
  @Column({ length: 50 })
  title: string;

  @Column({ length: 50 })
  description: string;

  @Column()
  done: boolean;

  @Column()
  index: number;

  @Column()
  priority: ETaskPriority;

  @ManyToOne(() => SectionTask, (sectionTask) => sectionTask.tasks, {
    onDelete: 'CASCADE',
  })
  sectionTask: SectionTask;

  @ManyToOne(() => ProjectTask, (projectTask) => projectTask.tasks, {
    onDelete: 'CASCADE',
  })
  projectTask: ProjectTask;
}

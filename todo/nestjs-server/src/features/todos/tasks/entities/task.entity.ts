import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '@shared/base.entity';
import { SectionTask } from '../../section-tasks/entities/section-task.entity';
import { ProjectTask } from '../../project-tasks/entities/project-task.entity';

@Entity()
export class Task extends BaseEntity {
  @Column({ length: 50 })
  title: string;

  @Column({ length: 50 })
  description: string;

  @Column({ length: 50 })
  status: string;

  @ManyToOne(() => SectionTask, (sectionTask) => sectionTask.tasks)
  sectionTask: SectionTask;

  @ManyToOne(() => ProjectTask, (projectTask) => projectTask.tasks)
  projectTask: ProjectTask;
}

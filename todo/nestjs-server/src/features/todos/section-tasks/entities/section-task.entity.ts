import { BaseEntity } from '@shared/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';
import { ProjectTask } from '@features/todos/project-tasks/entities/project-task.entity';

@Entity()
export class SectionTask extends BaseEntity {
  @Column({ length: 50 })
  title: string;

  @OneToMany(() => Task, (task) => task.sectionTask, { onDelete: 'CASCADE' })
  tasks: Task[];

  @ManyToOne(() => ProjectTask, (projectTask) => projectTask.sectionTasks, {
    onDelete: 'CASCADE',
  })
  projectTask: ProjectTask;
}

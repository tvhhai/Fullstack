import { BaseEntity } from '@shared/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../rbac/users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';
import { SectionTask } from '@features/todos/section-tasks/entities/section-task.entity';
import { ViewState } from '@features/todos/project-tasks/enum/project-tasks.enum';

@Entity()
export class ProjectTask extends BaseEntity {
  @Column({ length: 50 })
  title: string;

  @Column({ length: 10 })
  view: ViewState;

  @Column({ length: 10 })
  color: string;

  @ManyToOne(() => User, (user) => user.projectTask)
  user: User;

  @OneToMany(() => Task, (task) => task.projectTask)
  tasks: Task[];

  @OneToMany(() => SectionTask, (sectionTask) => sectionTask.projectTask)
  sectionTasks: SectionTask[];
}

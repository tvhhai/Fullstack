import { BaseEntity } from '@shared/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../../rbac/users/entities/user.entity';
import { Task } from '../../tasks/entities/task.entity';
import { SectionTask } from '@features/todos/section-tasks/entities/section-task.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class ProjectTask extends BaseEntity {
  @Column({ length: 50 })
  title: string;

  @ManyToOne(() => User, (user) => user.projectTask)
  user: User;

  @OneToMany(() => Task, (task) => task.projectTask)
  tasks: Task[];

  @OneToMany(() => SectionTask, (sectionTask) => sectionTask.projectTask)
  sectionTasks: SectionTask[];

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Exclude()
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}

import { Role } from '@features/rbac/roles/entities/role.entity';
import { BaseEntity } from '@shared/base.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { Preference } from '@features/preferences/entities/preference.entity';
import { TableSetting } from '@features/table-settings/entities/table-setting.entity';
import { ProjectTask } from '../../../todos/project-tasks/entities/project-task.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  password: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

  @Column()
  systemDefine: boolean;

  @Column({ nullable: true, length: 50 })
  @Exclude()
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  refreshTokenExp: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  @Transform(({ value }) => value.map((role: Role) => role.name), {
    toPlainOnly: true,
  })
  roles: Role[];

  @OneToMany(() => Preference, (val) => val.user)
  preferences: Preference[];

  @OneToMany(() => TableSetting, (val) => val.user)
  tableSetting: TableSetting[];

  @OneToMany(() => ProjectTask, (val) => val.user)
  projectTask: ProjectTask[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

import { Role } from 'src/features/roles/entities/role.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { PersonalExpense } from '../../personal-expenses/entities/personal-expense.entity';
import { Wallet } from '../../wallet/entities/wallet.entity';
import { ActionLog } from '../../action-log/entities/action-log.entity';
import { Setting } from '../../setting/entities/setting.entity';
import { Preference } from "../../preferences/entities/preference.entity";

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true, length: 50 })
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 50 })
  email: string;

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

  @OneToMany(() => PersonalExpense, (val) => val.user)
  personalExpense: PersonalExpense[];

  @OneToMany(() => Wallet, (val) => val.user)
  wallets: Wallet[];

  @OneToMany(() => ActionLog, (val) => val.user)
  actionLogs: ActionLog[];

  @OneToMany(() => Preference, (val) => val.user)
  preferences: Preference[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

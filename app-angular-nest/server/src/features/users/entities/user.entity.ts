import { Role } from 'src/features/roles/entities/role.entity';
import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import {
  classToPlain,
  Exclude,
  plainToInstance,
  Transform,
} from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column()
  // @Exclude()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  refreshTokenExp: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'user_role' })
  @Transform(({ value }) => value.name)
  roles: Role[];

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}

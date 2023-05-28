import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'date', nullable: true })
  refreshTokenExp: string;
}

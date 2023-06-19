import { BaseEntity } from 'src/shared/base.entity';
import { Entity, Column } from 'typeorm';
import { ERole } from '../enum/role.enum';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: ERole;

  constructor(partial: Partial<Role>) {
    super();
    Object.assign(this, partial);
  }
}

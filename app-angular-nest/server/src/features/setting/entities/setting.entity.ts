import { BaseEntity } from '../../../shared/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Setting extends BaseEntity {

}

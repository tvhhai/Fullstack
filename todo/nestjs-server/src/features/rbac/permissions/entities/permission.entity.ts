import { BaseEntity } from '@shared/base.entity';
import { Entity, Column } from 'typeorm';
import { EPermission } from '../enum/permission.enum';
 
@Entity()
export class Permission extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column('simple-array')
    permission :  Record<EPermission, boolean>

    // @Column({array: true, nullable: false})
    // permission: string;


    // @Column({ type: 'text' })
    // permission: string;

    // getPermissionArray(): EPermission[] {
    //   return JSON.parse(this.permission);
    // }
  
    // setPermissionArray(permissionArray: EPermission[]): void {
    //   this.permission = JSON.stringify(permissionArray);
    // }

    
}

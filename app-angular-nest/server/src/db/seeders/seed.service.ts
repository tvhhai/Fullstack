import { Injectable } from '@nestjs/common';
import { FeatureAccessService } from 'src/features/feature-access/feature-access.service';
import { EPermission } from 'src/features/permissions/enum/permission.enum';
import { ERole } from 'src/features/roles/enum/role.enum';
import { RolesService } from 'src/features/roles/roles.service';
import { UsersService } from 'src/features/users/users.service';
import { PERMISSIONS } from 'src/shared/constants/permisson.constant';
import {
  ROLE_ADMIN,
  ROLE_MOD,
  ROLE_USER,
} from 'src/shared/constants/role.constant';

@Injectable()
export class SeedService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
    private featureAccessService: FeatureAccessService,
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    const userCount = await this.userService.count();
    const roleCount = await this.roleService.count();
    const permissionCount = await this.featureAccessService.count();

    if (userCount > 0 && roleCount > 0 && permissionCount > 0) {
      return;
    }
    await this.seed();
  }

  private async seed() {
    const adminRole = await this.roleService.create({
      name: ERole.ROLE_ADMIN,
      systemDefine: true,
      permissions: ROLE_ADMIN,
    });
    const userRole = await this.roleService.create({
      name: ERole.ROLE_USER,
      systemDefine: true,
      permissions: ROLE_USER,
    });
    const modRole = await this.roleService.create({
      name: ERole.ROLE_MODERATOR,
      systemDefine: true,
      permissions: ROLE_MOD,
    });

    await this.userService.create({
      username: 'admin',
      password: 'switch',
      email: 'admin@gmail.com',
      roles: [adminRole],
    });
    await this.userService.create({
      username: 'user',
      password: 'switch',
      email: 'user@gmail.com',
      roles: [userRole],
    });
    await this.userService.create({
      username: 'mod',
      password: 'switch',
      email: 'mod@gmail.com',
      roles: [modRole],
    });

    await this.featureAccessService.create({
      feature: 'user',
      permission: PERMISSIONS,
    });
  }
}

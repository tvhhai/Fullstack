import { Injectable } from '@nestjs/common';
import { FeatureAccessService } from '@features/rbac/feature-access/feature-access.service';
import { ERole } from '@features/rbac/roles/enum/role.enum';
import { RolesService } from '@features/rbac/roles/roles.service';
import { UsersService } from '@features/rbac/users/users.service';
import {
  ROLE_ADMIN,
  ROLE_READ,
  ROLE_WRITE,
} from '@shared/constants/role.constant';

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
      description: 'Unrestricted Administrators',
      systemDefine: true,
      permissions: ROLE_ADMIN,
    });
    const writeRole = await this.roleService.create({
      name: ERole.ROLE_WRITER,
      description: 'Can Read and Write',
      systemDefine: true,
      permissions: ROLE_WRITE,
    });
    const readRole = await this.roleService.create({
      name: ERole.ROLE_READ,
      description: 'Read-Only Users',
      systemDefine: true,
      permissions: ROLE_READ,
    });

    await this.userService.create({
      username: 'admin',
      password: 'switch',
      email: 'admin@gmail.com',
      systemDefine: true,
      roles: [adminRole],
    });
    await this.userService.create({
      username: 'write',
      password: 'switch',
      email: 'write@gmail.com',
      systemDefine: true,
      roles: [writeRole],
    });
    await this.userService.create({
      username: 'read',
      password: 'switch',
      email: 'read@gmail.com',
      systemDefine: true,
      roles: [readRole],
    });

    await this.featureAccessService.create({
      feature: 'user',
      accessList: [],
    });
    await this.featureAccessService.create({
      feature: 'setting',
      accessList: [],
    });
  }
}

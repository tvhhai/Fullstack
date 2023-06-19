import { Injectable } from '@nestjs/common';
import { ERole } from 'src/features/roles/enum/role.enum';
import { RolesService } from 'src/features/roles/roles.service';
import { UsersService } from 'src/features/users/users.service';

@Injectable()
export class SeedService {
  constructor(
    private userService: UsersService,
    private roleService: RolesService,
  ) {
    this.initialize();
  }

  private async initialize(): Promise<void> {
    const userCount = await this.userService.count();
    const roleCount = await this.roleService.count();

    if (userCount > 0 && roleCount > 0) {
      return;
    }

    await this.seed();
  }

  private async seed() {
    const adminRole = await this.roleService.create({
      name: ERole.ROLE_ADMIN,
      // permissions: ['read:users', 'write:users'],
    });
    const userRole = await this.roleService.create({
      name: ERole.ROLE_USER,
      // permissions: ['read:users'],
    });
    const modRole = await this.roleService.create({
      name: ERole.ROLE_MODERATOR,
      // permissions: ['read:users'],
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
  }
}

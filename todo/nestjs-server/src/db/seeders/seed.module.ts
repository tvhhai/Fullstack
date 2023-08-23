import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '@features/rbac/users/users.module';
import { RolesModule } from '@features/rbac/roles/roles.module';
import { FeatureAccessModule } from '@features/rbac/feature-access/feature-access.module';

@Module({
  imports: [UsersModule, RolesModule, FeatureAccessModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {
}

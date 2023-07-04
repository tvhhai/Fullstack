import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/features/users/users.module';
import { RolesModule } from 'src/features/roles/roles.module';
import { FeatureAccessModule } from 'src/features/feature-access/feature-access.module';

@Module({
  imports: [UsersModule, RolesModule, FeatureAccessModule ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

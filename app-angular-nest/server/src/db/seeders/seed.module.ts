import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from 'src/features/users/users.module';
import { RolesModule } from 'src/features/roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}

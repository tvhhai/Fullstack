import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/features/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GuardService } from './guard/guard.service';
import { LocalStrategy, JwtVerifyStrategy, RefreshStrategy, JwtStrategy } from "./strategies";
import { PassportModule } from '@nestjs/passport';
import { LocalGuards } from './guards/local.guards';
import { JwtGuards } from './guards/jwt.guards';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'jwtSecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // GuardService,
    LocalStrategy,
    JwtStrategy,
    JwtVerifyStrategy,
    RefreshStrategy,
    LocalGuards,
    JwtGuards,
  ],
  exports: [AuthService],
})
export class AuthModule {}

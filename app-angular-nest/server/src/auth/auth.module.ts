import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/features/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy, RefreshStrategy, JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';
import { LocalGuards } from './guards/local.guard';
import { JwtGuards } from './guards/jwt.guard';
import { ConfigService } from '@nestjs/config';
import { RefreshGuard } from './guards/refresh.guard';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        global: true,
        secret: config.get<string>('jwtConfig.jwtSecretKey'),
        // secret: config.get<string>('JWT_SECRET'),
        // signOptions: { expiresIn: config.get('jwtConfig.jwtExpiresIn') },
      }),
      global: true,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshStrategy,
    LocalGuards,
    JwtGuards,
    RefreshGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}

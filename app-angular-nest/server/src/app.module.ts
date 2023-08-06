import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from './features/roles/roles.module';
import { SeedModule } from './db/seeders/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig } from './configs';
import { config } from 'dotenv';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { AuthGuard } from './auth/guards/auth.guard';
import { PasswordInterceptor } from './interceptors/password.interceptor';
import { httpInterceptorProviders } from './interceptors';
import { PermissionsModule } from './features/permissions/permissions.module';
import { FeatureAccessModule } from './features/feature-access/feature-access.module';
import { PersonalExpensesModule } from './features/personal-expenses/personal-expenses.module';
import { ExpenseCategoryModule } from './features/expense-category/expense-category.module';
import { WalletModule } from './features/wallet/wallet.module';

const ENV = process.env.NODE_ENV;

const envFilePath = `.env.${ENV || 'dev'}`;

config({
  path: envFilePath,
});

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('dbConfig'),
        autoLoadEntities: true,
        synchronize: true, // shouldn't be used in production - otherwise you can lose production data.
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    SeedModule,
    ConfigModule.forRoot({
      envFilePath: envFilePath,
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),
    PermissionsModule,
    FeatureAccessModule,
    PersonalExpensesModule,
    ExpenseCategoryModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ...httpInterceptorProviders,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('');
  }
}

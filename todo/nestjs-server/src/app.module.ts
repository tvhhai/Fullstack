import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@features/rbac/users/users.module';
import { AuthModule } from '@auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesModule } from '@features/rbac/roles/roles.module';
import { SeedModule } from './db/seeders/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig, dbConfig, jwtConfig } from './configs';
import { config } from 'dotenv';
import { AuthMiddleware } from '@auth/middleware/auth.middleware';
import { AuthGuard } from '@auth/guards/auth.guard';
import { httpInterceptorProviders } from './interceptors';
import { PermissionsModule } from '@features/rbac/permissions/permissions.module';
import { FeatureAccessModule } from '@features/rbac/feature-access/feature-access.module';
import { PreferencesModule } from '@features/preferences/preferences.module';
import { TableSettingsModule } from '@features/table-settings/table-settings.module';
import { TasksModule } from '@features/todos/tasks/tasks.module';
import { ProjectTasksModule } from '@features/todos/project-tasks/project-tasks.module';
import { SectionTasksModule } from '@features/todos/section-tasks/section-tasks.module';


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
    PreferencesModule,
    TableSettingsModule,
    TasksModule,
    ProjectTasksModule,
    SectionTasksModule,
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

import { APP_INTERCEPTOR } from '@nestjs/core';
import { PasswordInterceptor } from './password.interceptor';
import { ClassSerializerInterceptor } from '@nestjs/common';

export const httpInterceptorProviders = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },
  { provide: APP_INTERCEPTOR, useClass: PasswordInterceptor },
];

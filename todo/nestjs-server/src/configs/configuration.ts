import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('appConfig', () => ({
  port: parseInt(process.env.PORT) || 8080,
}));

import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwtConfig', () => ({
  jwtSecretKey: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN_STRING,
  jwtRefreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN_MS),
  cookieExpireIn: parseInt(process.env.COOKIE_EXPIRES_IN_MS),
}));

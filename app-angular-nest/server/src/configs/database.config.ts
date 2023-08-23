import { registerAs } from '@nestjs/config';

export const dbConfig = registerAs('dbConfig', () => ({
  type: process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'ng_nest_app',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  migrations: [__dirname + '/../db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: __dirname + '/../db/migrations',
  },
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  url: process.env.DB_URL,
  // ssl: { rejectUnauthorized: false },
  synchronize: false,
  // logging: true,
}));

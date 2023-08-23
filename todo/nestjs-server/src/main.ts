import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  const port = process.env.PORT || 3000;
  console.log(port);
  await app.listen(port);
}
bootstrap();

import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private config: ConfigService) {}

  @Public()
  @Get()
  getHello(): string {
    return `App is running on port ` + this.config.get('appConfig.port');
  }
}

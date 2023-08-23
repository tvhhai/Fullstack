import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Public } from '@auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Public()
  @Get()
  getHello(): string {
    return `App is running on port ` + this.configService.get('appConfig.port');
  }
}

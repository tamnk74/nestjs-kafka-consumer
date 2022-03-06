import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/health-check')
  async getApp(): Promise<string> {
    return 'OK';
  }
}

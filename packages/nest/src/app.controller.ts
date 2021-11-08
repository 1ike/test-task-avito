import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { ID, idParamName } from './app.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('newstories.json')
  async getNewestStories(): Promise<any[]> {
    return this.appService.getNewestStories();
  }

  @Get(`item/:${idParamName}.json`)
  getItem(@ID() id: string): string {
    return this.appService.getItem(id);
  }
}

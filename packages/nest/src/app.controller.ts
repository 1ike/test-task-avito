import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { StoryInterface } from '@test-task-avito/shared';
import { AppService } from './app.service';
import { ID, idParamName } from './app.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('newstories.json')
  getNewestStories(
    @Query('qty', ParseIntPipe) qty: number,
  ): Observable<StoryInterface[]> {
    return this.appService.getNewestStories(qty);
  }

  @Get(`item/:${idParamName}.json`)
  getItem(@ID() id: string): string {
    return this.appService.getItem(id);
  }
}

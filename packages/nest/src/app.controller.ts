import { Controller, Get, Query } from '@nestjs/common';
import { Observable } from 'rxjs';

import { StoryInterface, CommentInterface } from '@test-task-avito/shared';
import { AppService } from './app.service';
import { ID, idParamName } from './app.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('newstories.json')
  getNewestStories(
    @Query() query: { qty?: number },
  ): Observable<StoryInterface[]> {
    return this.appService.getNewestStories(query.qty);
  }

  @Get(`item/:${idParamName}.json`)
  getComment(@ID() id: number): Observable<CommentInterface> {
    return this.appService.getComment(id);
  }
}

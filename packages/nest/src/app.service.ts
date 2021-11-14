import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

import { ID, IDs, StoryInterface } from '@test-task-avito/shared';
import { ConfigVarNames } from './config/configuration';
import { CommentInterface } from './../../shared/index.d';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  getNewestStories(
    storiesQty: number = this.configService.get(ConfigVarNames.STORIES_QTY),
  ): Observable<StoryInterface[]> {
    const storyIds$ = this.getNewestStoryIds(storiesQty);
    const stories$ = storyIds$.pipe(
      switchMap((ids) =>
        forkJoin(
          ids.map((id: ID) =>
            this.httpService.get(
              `${this.configService.get(
                ConfigVarNames.HACKER_NEWS_API_URL,
              )}/item/${id}.json`,
            ),
          ),
        ),
      ),
      map((rawData: AxiosResponse<StoryInterface>[]) =>
        rawData.map(({ data }) => data).filter(this.isValidItem),
      ),
      catchError((error) => {
        console.log('log stories error somewhere: ', error);
        return of(error);
      }),
    );

    return stories$;
  }

  private getNewestStoryIds(storiesQty: number): Observable<IDs> {
    const storyIds$ = this.httpService
      .get(
        `${this.configService.get(
          ConfigVarNames.HACKER_NEWS_API_URL,
        )}/newstories.json`,
      )
      .pipe(
        map(({ data }) => data.slice(0, storiesQty)),
        catchError((error) => {
          console.log('log story ids error somewhere: ', error);
          return of(error);
        }),
      );

    return storyIds$;
  }

  private isValidItem(item: StoryInterface | CommentInterface): boolean {
    return Boolean(item);
  }

  getItem(id: string): string {
    return id;
  }
}

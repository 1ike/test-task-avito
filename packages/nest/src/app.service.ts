import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  catchError,
  forkJoin,
  map,
  Observable,
  of,
  switchMap,
  defaultIfEmpty,
} from 'rxjs';

import {
  ID,
  IDs,
  StoryInterface,
  CommentInterface,
} from '@test-task-avito/shared';
import { ConfigVarNames } from './config/configuration';
import { ValidationService } from './validation/validation.service';
import { ValidationEntities } from './validation/schemas';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly validationService: ValidationService,
  ) {}

  getNewestStories(
    storiesQty: number = this.configService.get(ConfigVarNames.STORIES_QTY),
  ): Observable<StoryInterface[]> {
    const storyIds$ = this.getNewestStoryIds(storiesQty);
    const stories$ = storyIds$.pipe(
      switchMap((ids) =>
        forkJoin(ids.map((id) => this.getItem<StoryInterface>(id))),
      ),
      map((stories) =>
        stories.filter((story) =>
          this.validationService.validateEntity(
            story,
            ValidationEntities.Story,
          ),
        ),
      ),
      defaultIfEmpty([]),
      catchError((error) => {
        console.error('log Stories error somewhere: ', error);
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
          console.error('log Story ids error somewhere: ', error);
          return of(error);
        }),
      );

    return storyIds$;
  }

  private getItem<T>(id: ID): Observable<T> {
    const item$ = this.httpService
      .get(
        `${this.configService.get(
          ConfigVarNames.HACKER_NEWS_API_URL,
        )}/item/${id}.json`,
      )
      .pipe(
        map(({ data }) => data),
        catchError((error) => {
          console.error(`log entity with id "${id}" error somewhere: `, error);
          return of(error);
        }),
      );

    return item$;
  }

  getComment(id: ID): Observable<CommentInterface> {
    const comment$ = this.getItem<CommentInterface>(id);

    return comment$;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

import { environment } from '../../environments/environment';
import { ValidationService } from './validation/validation.service';
import { EntityNames  } from './validation/schemas';


@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly validationService: ValidationService,
  ) {}

  getNewestStories(
    storiesQty: number = environment.STORIES_QTY,
  ): Observable<StoryInterface[]> {
    const storyIds$ = this.getNewestStoryIds(storiesQty);
    const stories$ = storyIds$.pipe(
      switchMap((ids) =>
        forkJoin(ids.map((id) => this.getItem<StoryInterface>(id, EntityNames.Story))),
      ),
      map((stories) => stories.filter((story) => !(story instanceof Error))),
      defaultIfEmpty([]),
      catchError((error) => {
        console.error('log Stories error somewhere: ', error);
        return of(error);
      }),
    );

    return stories$;
  }

  private getNewestStoryIds(storiesQty: number): Observable<IDs> {
    const storyIds$ = this.httpClient
      .get(
        `${environment.HACKER_NEWS_API_URL}/newstories.json`,
      )
      .pipe(
        map(( data ) => (data as IDs).slice(0, storiesQty)),
        catchError((error) => {
          console.error('log Story ids error somewhere: ', error);
          return of(error);
        }),
      );

    return storyIds$;
  }

  private getItem<T extends Pick<StoryInterface, 'time'>>(id: ID, entityName: EntityNames): Observable<T> {
    const item$ = this.httpClient
      .get<T>(
      `${environment.HACKER_NEWS_API_URL}/item/${id}.json`,
    )
      .pipe(
        map(( entity ) => {
          if (!this.validationService.validateEntity(
            entity,
            EntityNames[entityName],
          )) {
            throw new Error(`Validation entity with id "${id}" failed`);
          }

          entity.time = entity.time * 1000;

          return entity;
        }),
        catchError((error) => {
          console.error(`log entity with id "${id}" error somewhere: `, error);
          return of(error);
        }),
      );

    return item$;
  }

  getComment(id: ID): Observable<CommentInterface> {
    const comment$ = this.getItem<CommentInterface>(id, EntityNames.Comment);

    return comment$;
  }
}

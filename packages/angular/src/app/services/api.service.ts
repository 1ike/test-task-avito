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
  Time,
} from '@test-task-avito/shared';

import { environment } from '../../environments/environment';
import { ValidationService } from './validation/validation.service';
import { DateService } from './date.service';
import { EntityNames } from './validation/schemas';


export interface CommentTreeNode {
  data: CommentInterface;
  children: CommentTreeNode[];
  qty: number;
  level: number;
}

export interface CommentTreeData {
  children: CommentTreeNode[];
  qty: number;
}


@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly validationService: ValidationService,
    private readonly dateService: DateService,
  ) { }

  getNewestStories(
    storiesQty: number = environment.STORIES_QTY,
  ): Observable<StoryInterface[]> {
    const storyIds$ = this.getNewestStoryIds(storiesQty);
    const stories$ = storyIds$.pipe(
      map((idsData) => (idsData instanceof Error) ? [] : idsData),
      switchMap((ids) =>
        forkJoin(ids.map((id) => this.getStory(id))),
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

  private getNewestStoryIds(storiesQty: number): Observable<IDs | Error> {
    const storyIds$ = this.httpClient
      .get(
        `${environment.HACKER_NEWS_API_URL}/newstories.json`,
      )
      .pipe(
        map((data) => (data as IDs).slice(0, storiesQty)),
        catchError((error) => {
          console.error('log Story ids error somewhere: ', error);
          return of(error);
        }),
      );

    return storyIds$;
  }

  private getItem<T extends { time: Time }>(id: ID, entityName: EntityNames): Observable<T | Error> {
    const item$ = this.httpClient
      .get<T>(
      `${environment.HACKER_NEWS_API_URL}/item/${id}.json`,
    )
      .pipe(
        map((entity) => {
          if (!this.validationService.validateEntity(
            entity,
            EntityNames[entityName],
          )) {
            throw new Error(`Validation entity with id "${id}" failed`);
          }

          entity.time = this.dateService.transformDate(entity.time);

          return entity;
        }),
        catchError((error) => {
          console.error(`log entity with id "${id}" error somewhere: `, error);
          return of(error);
        }),
      );

    return item$;
  }

  getStory(id: ID): Observable<StoryInterface | Error> {
    const story$ = this.getItem<StoryInterface>(id, EntityNames.Story);

    return story$;
  }

  getComment(id: ID): Observable<CommentInterface | Error> {
    const comment$ = this.getItem<CommentInterface>(id, EntityNames.Comment);

    return comment$;
  }

  getCommentTree(kids: IDs = [], level = 1): Observable<any> {

    if (!kids?.length) return of({ children: [], qty: 0 });

    const getNode = (id: ID) => this.getComment(id).pipe(
      switchMap((commentData) => {
        if (commentData instanceof Error) return of(commentData);

        const commentNode$ = this.getCommentTree(commentData?.kids, level + 1).pipe(
          map(({ children, qty }) => ({ data: commentData, children, qty, level }) as CommentTreeNode),
        );

        return commentNode$;
      }),
    );

    return of(kids).pipe(
      switchMap((ids) => forkJoin(ids.map((id) => getNode(id)))),
      map((commentNodesData) => {
        const commentNodes = commentNodesData.filter((node) => !(node instanceof Error)) as CommentTreeNode[];

        const qty = commentNodes.reduce((acc, node) => acc + node.qty, commentNodes.length);

        return { children: commentNodes, qty };
      }),
    );
  }
}

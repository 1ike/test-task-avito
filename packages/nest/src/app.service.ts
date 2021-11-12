import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';

import { ID, IDs, StoryInterface } from '@test-task-avito/shared';
import { ConfigVarNames } from './config/configuration';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { CommentInterface } from './../../shared/index.d';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNewestStories(): Promise<StoryInterface[]> {
    try {
      const ids = await this.getNewestStoriesIds();
      // const rawData = await this.getNewestStoriesRaw();
      const filtered = 'res';

      return [];
    } catch (error) {
      console.log('log error somewhere');
    }
  }

  private getNewestStoriesIds(): Promise<IDs> {
    this.httpService
      .get(
        `${this.configService.get(
          ConfigVarNames.HACKER_NEWS_API_URL,
        )}/newstories.json`,
      )
      .pipe(
        map(({ data }) => data.slice(0, 5)),
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
      )
      .subscribe({
        next(res) {
          console.log('res = ', res);
          return res;
        },
        error(err) {
          console.log('log error somewhere: ', err);
          throw new Error("Can't fetch newest stories");
        },
      });

    return Promise.resolve([]);
  }

  private isValidItem(item: StoryInterface | CommentInterface): boolean {
    return Boolean(item);
  }

  getItem(id: string): string {
    return id;
  }
}

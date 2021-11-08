import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { StoryInterface } from '@test-task-avito/shared';
import { ConfigVarNames } from './config/configuration';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getNewestStories(): Promise<StoryInterface[]> {
    try {
      const res = await this.httpService.get(
        this.configService.get(ConfigVarNames.HACKER_NEWS_API_URL),
      );
      const filtered = res;

      return filtered;
    } catch (error) {
      console.log('log error somewhere');
    }
  }

  getItem(id: string): string {
    return id;
  }
}

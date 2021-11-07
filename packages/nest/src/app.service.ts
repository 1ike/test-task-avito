import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getNewestStories(): string {
    return 'Hello World!';
  }

  getItem(id: string): string {
    return id;
  }
}

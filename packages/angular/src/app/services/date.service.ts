import { Injectable } from '@angular/core';
import { Time } from '@test-task-avito/shared';


@Injectable({
  providedIn: 'root',
})
export class DateService {
  readonly transformDate = (time: Time) => time * 1000;

  readonly formatDate = (time: Time) => (new Date(time)).toLocaleString('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

}

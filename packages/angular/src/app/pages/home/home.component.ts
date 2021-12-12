import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Observable,
} from 'rxjs';

import { StoryInterface, Time } from '@test-task-avito/shared';
import { APIService } from '../../services/api.service';
import { DateService } from '../../services/date.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {

  stories$!: Observable<StoryInterface[]>;

  timer!: ReturnType<typeof setTimeout>;

  public pollingInterval: number = environment.POLLING_INTERVAL;
  

  constructor(private apiService: APIService, private dateService: DateService) {}

  ngOnInit(): void {
    this.stories$ = this.apiService.getNewestStories(10);

    this.startStoriesPolling();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }


  fetchStories() {
    this.stories$ = this.apiService.getNewestStories(10);
  }

  private startStoriesPolling() {
    this.fetchStories();
    this.timer = setTimeout(() => {
      this.startStoriesPolling();
    }, this.pollingInterval);
  }

  formatDate = (date: Time) => this.dateService.formatDate(date);
}

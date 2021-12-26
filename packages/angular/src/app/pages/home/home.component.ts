import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { StoryInterface, Time } from '@test-task-avito/shared';
import { APIService } from '../../services/api.service';
import { DateService } from '../../services/date.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from 'src/app/services/loading.service';
import polling, { PollingSubscription } from 'src/app/lib/polling';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  stories: StoryInterface[] = [];

  storiesQtyPerPage: number = environment.STORIES_QTY_PER_PAGE;

  loading$ = this.loader.loading$;

  private subscription: PollingSubscription = null;

  constructor(
    private apiService: APIService,
    private dateService: DateService,
    public loader: LoadingService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.startStoriesPolling();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  fetchStories = () => {
    this.loader.show();
    return this.apiService.getNewestStories(this.storiesQtyPerPage);
  };

  setStories = (stories: StoryInterface[]) => {
    this.stories = stories;
    this.loader.hide();
  };

  fetchStoriesErrorCallback(error: Error) {
    console.error('Got an error when fetching Stories: ', error);
    this.loader.hide();
  }

  private startStoriesPolling() {
    polling({
      subscription: this.subscription,
      setSubscription: (subscription) => {
        this.subscription = subscription;
      },
      streamFactory: () => this.fetchStories(),
      successCallback: this.setStories,
      errorCallback: this.fetchStoriesErrorCallback,
    });
  }

  formatDate = (date: Time) => this.dateService.formatDate(date);

  onClickStory = (story: StoryInterface) => {
    this.router.navigate(['/', story.id], {
      state: { storyStringified: JSON.stringify(story) },
    });
  };

  onClickRefreshButton = () => this.startStoriesPolling();

  onClickShowMoreButton = () => {
    this.storiesQtyPerPage += environment.STORIES_QTY_PER_PAGE;
    this.startStoriesPolling();
  };

  showShowMoreButton = () => this.storiesQtyPerPage <= environment.STORIES_QTY;
}

import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { StoryInterface, Time } from '@test-task-avito/shared';
import { APIService } from '../../services/api.service';
import { DateService } from '../../services/date.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {

  stories: StoryInterface[] = [];

  timer!: ReturnType<typeof setTimeout>;

  storiesQtyPerPage: number = environment.STORIES_QTY_PER_PAGE;

  loading$ = this.loader.loading$;

  private subscription: Subscription | null = null;


  constructor(
    private apiService: APIService,
    private dateService: DateService,
    public loader: LoadingService,
    private router: Router,
  ) {
    this.startStoriesPolling();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }


  fetchStories() {
    if (this.subscription) this.subscription.unsubscribe();

    this.loader.show();

    this.subscription = this.apiService.getNewestStories(this.storiesQtyPerPage).subscribe(
      {
        next: (stories) => {
          this.stories = stories;
          this.loader.hide();
        },
        error: err => {
          console.error('Observer got an error: ' + err);
          this.loader.hide();
        },
      },
    );
  }

  private startStoriesPolling() {
    this.fetchStories();
    this.timer = setTimeout(() => {
      this.startStoriesPolling();
    }, environment.POLLING_INTERVAL);
  }

  formatDate = (date: Time) => this.dateService.formatDate(date);

  onClickStory = (story: StoryInterface) => {
    this.router.navigate(['/', story.id], {
      state: { storyStringified: JSON.stringify(story) },
    });
  };

  onClickRefreshButton = () => this.fetchStories();

  onClickShowMoreButton = () => {
    this.storiesQtyPerPage += environment.STORIES_QTY_PER_PAGE;
    this.fetchStories();
  };

  showShowMoreButton = () => this.storiesQtyPerPage <= environment.STORIES_QTY;
}

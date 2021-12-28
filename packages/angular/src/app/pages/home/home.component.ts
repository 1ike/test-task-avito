import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, pairwise } from 'rxjs';

import { StoryInterface, Time } from '@test-task-avito/shared';
import { APIService } from '../../services/api.service';
import { DateService } from '../../services/date.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from 'src/app/services/loading.service';
import polling, { PollingSubscription } from 'src/app/lib/polling';
import { ScrollService } from 'src/app/services/scroll.service';


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

  suspendLoading$!: Observable<[NavigationEnd, NavigationEnd]>;

  constructor(
    private apiService: APIService,
    private dateService: DateService,
    public loader: LoadingService,
    private router: Router,
    private scrollService: ScrollService,
  ) {
    this.suspendLoading$ = router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      pairwise(),
    );

    this.suspendLoading$.subscribe({
      next: ([previousEvent, currentEvent]) => {
        if (previousEvent.url === '/') {
          this.subscription?.unsubscribe();
        } else if (currentEvent.url === '/') {
          setTimeout(
            () => this.scrollService.restoreScrollPosition(),
            0,
          );

          this.startStoriesPolling(environment.POLLING_INTERVAL);
        }
      },
    });
  }

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

  private startStoriesPolling(startDelay = 0) {
    polling({
      subscription: this.subscription,
      setSubscription: (subscription) => {
        this.subscription = subscription;
      },
      streamFactory: () => this.fetchStories(),
      successCallback: this.setStories,
      errorCallback: this.fetchStoriesErrorCallback,
      startDelay: startDelay,
    });
  }

  formatDate = (date: Time) => this.dateService.formatDate(date);

  onClickStory = (story: StoryInterface) => {
    this.scrollService.saveScrollPosition();

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

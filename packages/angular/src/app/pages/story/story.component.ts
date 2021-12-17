import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';


import { StoryInterface } from '@test-task-avito/shared';
import { DateService } from 'src/app/services/date.service';
import { APIService } from 'src/app/services/api.service';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  story!: StoryInterface;

  storyFetchingError: null | Error = null;

  constructor(
    private titleService: Title,
    public location: Location,
    public dateService: DateService,
    private apiService: APIService,
    private route: ActivatedRoute,
    private zone: NgZone,
  ) {
    const { storyStringified } = this.location.getState() as { storyStringified?: string };
    if (storyStringified) {
      this.story = JSON.parse(storyStringified);
    }
  }

  ngOnInit() {
    if (this.story) {
      this.titleService.setTitle(this.story.title);
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.apiService.getStory(id).subscribe({
        next: (data) => {
          if (data instanceof Error) {
            this.storyFetchingError = data;
          } else {
            this.story = data;
          }
        },
      });
    }
  }

  reloadPage() {
    this.zone.runOutsideAngular(() => {
      location.reload();
    });
  }
}

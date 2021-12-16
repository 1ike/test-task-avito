import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import { StoryInterface } from '@test-task-avito/shared';


@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss'],
})
export class StoryComponent implements OnInit {

  story!: StoryInterface;

  constructor(private location: Location) {
    if (history.state.story) {
      this.story = JSON.parse(history.state.story);
    }
  }

  ngOnInit() {
    console.log('this.story = ', this.story);
  }

}

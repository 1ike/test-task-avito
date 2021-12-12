import { Component, OnInit } from '@angular/core';
import {  Observable,
} from 'rxjs';

import { StoryInterface, Time } from '@test-task-avito/shared';
import { APIService } from '../../services/api.service';
import { DateService } from '../../services/date.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  stories$!: Observable<StoryInterface[]>;

  constructor(private apiService: APIService, private dateService: DateService) { }

  ngOnInit(): void {
    this.stories$ = this.apiService.getNewestStories(10);
  }

  formatDate = (date: Time) => this.dateService.formatDate(date);
}

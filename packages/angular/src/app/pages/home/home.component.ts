import { Component, OnInit } from '@angular/core';

import { APIService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    console.log(' Home ');

    this.apiService.getNewestStories(10).subscribe(data => console.log('appService data = ', data));
  }

}

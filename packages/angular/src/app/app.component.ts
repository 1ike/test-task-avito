import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';

  loading$ = this.loader.loading$;

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loader: LoadingService,
  ) { }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;

          if (!child) return null;

          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return appTitle;
        }),
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}

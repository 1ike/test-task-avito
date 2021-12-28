import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class ScrollService {

  private scrollPosition = 0;

  saveScrollPosition() {
    this.scrollPosition = window.scrollY || window.pageYOffset;
  }

  restoreScrollPosition() {
    window.scrollTo({
      top: this.scrollPosition,
    });
  }

}

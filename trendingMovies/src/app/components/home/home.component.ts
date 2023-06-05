import { Component, Inject, Renderer2 } from '@angular/core';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import {
  trigger,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('enemy', [
      transition(
        'void => *',
        animate(2000, keyframes([style({ opacity: 1 }), style({ opacity: 1 })]))
      ),
    ]),
  ],
})
export class HomeComponent {
  filt: string = '';
  id: number = 0;
  num: number = 1;
  trend: any[] = [];
  constructor(
    public _Api: ApiServiceService,
    @Inject(DOCUMENT) private document: Document,
    private _Router: Router,
    private _Reviews: ReviewService
  ) {
    this._Reviews.setIsLoading(true);
    this._Api.trendMovies().subscribe((res) => {
      console.log(res);
      this.trend = res.results;
      setTimeout(() => {
        this._Reviews.setIsLoading(false);
      }, 1500);
    });
  }

  ngOnInit() {}

  pages(num: number) {
    this.num = num;
    const active = this.document.querySelectorAll('.page-link');
    active.forEach((el: any) => {
      el.addEventListener('click', () => {
        active.forEach((el: any) => {
          el.classList.remove('active');
        });
        el.classList.add('active');
      });
    });
    if (num > 0 && num <= 20) {
      this._Api.popular(num).subscribe((res) => {
        this.trend = res.results;
      });
    }
  }
}

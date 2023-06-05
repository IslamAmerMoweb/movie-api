import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';
import anime from 'animejs/lib/anime.es.js';
import { Movies } from 'src/app/core/interface/movies';
import { ApiServiceService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss'],
})
export class TvShowsComponent {
  page: number = 1;
  tvData: string = '';
  tvTrend: Movies[] = [];
  poster: string = 'https://image.tmdb.org/t/p/w500';
  backDrop: string =
    'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  constructor(
    private _Reviews: ReviewService,
    private _ActivateRoute: ActivatedRoute,
    public _Api: ApiServiceService
  ) {
    this._Reviews.setIsLoading(true);
    this._ActivateRoute.paramMap.subscribe((res) => {
      const tv = res.get('tv')!;
      this.tvData = tv.replace('_', ' ');
      this.tvShow(tv);
      setTimeout(() => {
        this._Reviews.setIsLoading(false);
      }, 1500);
    });
  }

  tvShow(tv: string) {
    this._Reviews.setIsLoading(true);
    this._Reviews.airingToday(tv, this.page).subscribe({
      next: (res) => {
        this.tvTrend = res.results;
        setTimeout(() => {
          this._Reviews.setIsLoading(false);
        }, 1500);
      },
    });
  }

  hover(leave: HTMLElement) {
    leave.style.left = '85%';
  }

  leaveInput(value: string, leave: HTMLElement) {
    if (value == '') {
      leave.style.left = '0';
    }
  }
  check: boolean = false;
  tvSearch(name: string, page: number) {
    this._Reviews.tvSearch(name, page).subscribe({
      next: (res) => {
        if (res.results.length != 0) {
          this.check = false;
          this.tvTrend = res.results.filter(
            (el: any) => el.poster_path != null
          );
        } else {
          this.check = true;
        }
        console.log(res);
      },
    });
  }
}

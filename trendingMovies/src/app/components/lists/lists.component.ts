import { Component, Input } from '@angular/core';
import { list } from 'src/app/core/interface/movies';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent {
  watchList: list[] = [];
  poster: string = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  post: string = 'https://image.tmdb.org/t/p/w500';
  constructor(
    private _Api: ApiServiceService,
    private _Reviews: ReviewService
  ) {
    this._Api.showList().subscribe({
      next: (res) => {
        this._Reviews.change.next(res.data);
        this.watchList = res.data;
      },
    });
  }

  ngDoCheck() {
    this.watchList = this._Reviews.change.getValue();
  }
}

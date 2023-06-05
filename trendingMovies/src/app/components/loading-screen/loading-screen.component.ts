import { Component } from '@angular/core';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  isLoading = this._Reviews.getIsLoading();
  constructor(private _Reviews: ReviewService) {}

  ngDoCheck() {
    this.isLoading = this._Reviews.isLoading.getValue();
    // this.isLoading = this._Reviews.isLoading.getValue();
  }
}

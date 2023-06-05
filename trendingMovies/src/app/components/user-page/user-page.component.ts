import { Component } from '@angular/core';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  userName: string = '';
  constructor(private _Reviews: ReviewService) {
    this.userName = localStorage.getItem('name')!;
    this._Reviews.setIsLoading(true);
    setTimeout(() => {
      this._Reviews.setIsLoading(false);
    }, 1500);
  }

  delAllList() {
    this._Reviews.delAllList().subscribe((res) => {
      this._Reviews.change.next([]);
    });
  }
}

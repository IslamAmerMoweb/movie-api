import { Component } from '@angular/core';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';
import { review } from 'src/app/core/interface/movies';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  id: string = '';
  style: string = '';
  author_details?: review = {
    avatar_path: '',
  };
  reviews: review = {
    content: '',
    updated_at: '',
  };
  result: boolean = true;
  constructor(
    private _Review: ReviewService,
    private _Activate: ActivatedRoute
  ) {
    this._Activate.parent?.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
    });
  }

  ngOnInit(): void {
    this._Review.reviews(this.id).subscribe({
      next: (res) => {
        if (res.results.length != 0) {
          const image = res.results.filter((el: any) => {
            if (el.author_details.avatar_path != null) {
              return el.author_details.avatar_path.includes('http');
            }
          });
          if (image.length) {
            this.author_details =
              image[Math.floor(Math.random() * image.length)].author_details;
            this.reviews =
              res.results[Math.floor(Math.random() * res.results.length)];
          } else {
            this.result = false;
          }
        } else {
          this.result = false;
        }
      },
    });
    this._Review.video(this.id).subscribe({
      next: (res) => {
        if (res) {
          // console.log(res);
        }
      },
    });
  }
}

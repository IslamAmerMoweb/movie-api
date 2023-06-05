import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { actors } from 'src/app/core/interface/movies';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.scss'],
})
export class ActorsComponent {
  page: number = 1;
  poster: string = 'https://image.tmdb.org/t/p/w500';
  actors: actors[] = [];
  constructor(
    private _Reviews: ReviewService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this._Reviews.setIsLoading(true);
    this._Reviews.actors(this.page).subscribe({
      next: (res) => {
        if (res.results !== 0) {
          this.actors = res.results.filter(
            (el: any) => el.profile_path != null
          );
          setTimeout(() => {
            this._Reviews.setIsLoading(false);
          }, 1500);
        }
      },
    });
  }

  pages(num: number) {
    this.page = num;
    const active = this.document.querySelectorAll('.page-link');
    active.forEach((el: any) => {
      el.addEventListener('click', (e: any) => {
        active.forEach((el: any) => {
          el.classList.remove('active');
        });
        if (e.type == 'click') {
          el.classList.add('active');
          console.log(e.type == 'click');
        }
      });
    });
    if (num > 0 && num <= 20) {
      this._Reviews.actors(this.page).subscribe({
        next: (res) => {
          if (res.results !== 0) {
            this.actors = res.results.filter(
              (el: any) => el.profile_path != null
            );
          }
        },
      });
    }
  }
  notFound: boolean = false;
  peopleSearch(name: string, page: number) {
    this._Reviews.peopleSearch(name, page).subscribe({
      next: (res) => {
        if (res.results.length != 0) {
          this.notFound = false;
          this.actors = res.results.filter(
            (el: any) => el.profile_path != null
          );
        } else {
          this.notFound = true;
        }
      },
    });
  }
}

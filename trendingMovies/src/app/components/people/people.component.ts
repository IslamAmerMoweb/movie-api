import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { credit, people } from 'src/app/core/interface/movies';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
})
export class PeopleComponent {
  id: string = '';
  poster: string = 'https://image.tmdb.org/t/p/w500';
  people: people = {
    profile_path: '',
    biography: '',
    place_of_birth: '',
    name: '',
    known_for_department: '',
  };
  credit: credit[] = [];
  constructor(
    private _Reviews: ReviewService,
    private _ActivateRoute: ActivatedRoute
  ) {
    this._ActivateRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id')!;
      },
    });
    this._Reviews.setIsLoading(true);
    this._Reviews.actorsDetails(this.id).subscribe({
      next: (res) => {
        this.people = res;
        setTimeout(() => {
          this._Reviews.setIsLoading(false);
        }, 1500);
      },
    });

    this._Reviews.peopleCredit(this.id).subscribe({
      next: (res) => {
        this.credit = res.cast.filter((el: any) => el.poster_path !== null);
        console.log(res);
      },
    });
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss'],
})
export class DiscussionsComponent {
  id: string = '';
  userImg: string = '';
  discussions: Array<any> = [];
  showMsg: string = '';
  constructor(
    private _Reviews: ReviewService,
    private _ActivateRout: ActivatedRoute
  ) {
    this._ActivateRout.parent?.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
    });
    this._Reviews.reviews(this.id).subscribe((res): any => {
      this.discussions = res.results.filter(
        (el: any) => el.author_details.avatar_path != null
      );
    });
  }

  ngOnInit() {}
}

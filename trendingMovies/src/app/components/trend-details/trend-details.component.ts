import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Movies } from 'src/app/core/interface/movies';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-trend-details',
  templateUrl: './trend-details.component.html',
  styleUrls: ['./trend-details.component.scss'],
})
export class TrendDetailsComponent {
  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    margin: 15,
    responsiveRefreshRate: 1,
    autoWidth: true,
    navSpeed: 500,
    dots: false,
    dotsData: true,
    mouseDrag: true,
    navText: ['', ''],
    nav: true,
    responsive: {
      0: {
        slideBy: 5,
        smartSpeed: 500,
        nav: true,
        items: 6,
      },
    },
  };
  poster: string = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  orgImage: string = 'https://image.tmdb.org/t/p/w500';
  crew: any[] = [];
  country: any[] = [];
  credit: any[] = [];
  genres: any[] = [];
  imag: any[] = [];
  data: Movies = {
    backdrop_path: '',
    poster_path: '',
    title: '',
    release_date: '',
    overview: '',
    status: '',
    original_language: '',
    budget: '',
    revenue: '',
  };
  id: string = '';
  image: string = '';
  postImage: string = '';
  constructor(
    private _Api: ApiServiceService,
    private _Activat: ActivatedRoute,
    private _Reviews: ReviewService
  ) {
    this._Activat.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
    });
    this._Reviews.setIsLoading(true);
    this._Api.credit(this.id).subscribe((res) => {
      this.credit = res.cast.slice(0, 3);
      const unique = res.crew;
      const uniqueIds: any[] = [];
      this.crew = unique.filter((element: any) => {
        const isDuplicate = uniqueIds.includes(element.id);

        if (!isDuplicate && element.profile_path) {
          uniqueIds.push(element.id);

          return true;
        }

        return false;
      });
      setTimeout(() => {
        this._Reviews.setIsLoading(false);
      }, 1500);
    });
  }

  ngOnInit() {
    this._Api.trendDetails(this.id).subscribe({
      next: (res) => {
        if (res.backdrop_path != undefined) {
          this.data = res;
          this.image = this.poster.concat(this.data.backdrop_path);
          this.postImage = this.orgImage.concat(this.data.poster_path!);

          const [origin_country] = res.production_companies;
          if (origin_country) {
            this.country = origin_country.origin_country;
          }
          this.genres = res.genres;
          console.log(this.data);
        }
      },
    });
    this._Api.images(this.id).subscribe((res) => {
      this.imag = res.backdrops;
    });
  }
}

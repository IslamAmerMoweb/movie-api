import { similar } from './../../core/interface/movies';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/lib/models/owl-options.model';
import { credit, tvDetails } from 'src/app/core/interface/movies';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.scss'],
})
export class TvDetailsComponent {
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
  id: string = '';
  crew: Array<any> = [];
  geners: Array<any> = [];
  credit: credit[] = [];
  similar: similar[] = [];
  path: string = 'https://image.tmdb.org/t/p/w500';
  poster: string = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  imagePoster: string = '';
  posterImage: string = '';
  tvDetails: tvDetails = {
    backdrop_path: '',
    poster_path: '',
    overview: '',
    status: '',
    production_countries: {
      name: '',
    },
    original_language: '',
    budget: '',
    revenue: '',
  };
  constructor(
    private _ReviewsTv: ReviewService,
    private _ActivateRoutte: ActivatedRoute,
    private router: Router
  ) {
    this._ActivateRoutte.paramMap.subscribe((idTv) => {
      this.id = idTv.get('id')!;
    });
  }

  ngOnInit(): void {
    this._ReviewsTv.setIsLoading(true);
    this._ReviewsTv.tvDetails(this.id).subscribe((res) => {
      if (res) {
        this.tvDetails = res;
        this.imagePoster = this.poster.concat(this.tvDetails.backdrop_path);
        this.posterImage = this.path.concat(this.tvDetails.poster_path);
        this.geners = res.genres;
        setTimeout(() => {
          this._ReviewsTv.setIsLoading(false);
        }, 1500);
      }
    });

    this._ReviewsTv.tvCredits(this.id).subscribe({
      next: (res) => {
        if (res) {
          console.log(res);
          this.credit = res.cast.slice(0, 3);
          if (res.crew.length != 0) {
            this.crew = res.crew;
            console.log(this.crew, 'crew');
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
          }
        }
      },
    });
    this._ReviewsTv.tvSimilar(this.id, 1).subscribe((res) => {
      if (res.results !== 0) {
        this.similar = res.results.filter((el: any) => el.poster_path != null);
        console.log(this.similar, 'similar');
      }
    });
  }

  playSimilar(id: string) {
    this.id = id;
    this.ngOnInit();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}

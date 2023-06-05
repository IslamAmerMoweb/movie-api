import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 1500,
    autoplay: true,
    autoplayTimeout: 2500,
    autoplaySpeed: 2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };
  num: number = 1;
  id: number = 0;
  path: string = 'https://image.tmdb.org/t/p/w500';
  poster: string = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  nowPlaying!: Array<any>;
  show: string = '';
  header: string = '';
  wordMovies: string = '';
  timeOut: any;
  constructor(
    private _Reviews: ReviewService,
    @Inject(DOCUMENT) private document: Document,
    private _ActivateRoute: ActivatedRoute
  ) {
    this._ActivateRoute.paramMap.subscribe((res) => {
      const play = res.get('Playing')!;
      this.wordMovies = play;
      this.header = play!.replace('_', ' ');
      this.nowIsPlay(play!, this.num);
    });
  }

  nowIsPlay(word: string, num: number) {
    this._Reviews.setIsLoading(true);
    this._Reviews.nowPlaying(word, num).subscribe({
      next: (res) => {
        this.nowPlaying = res.results;
        this.id = this.nowPlaying.length - 1;
        this.show = this.poster + this.nowPlaying[this.id].backdrop_path;
        setTimeout(() => {
          this._Reviews.setIsLoading(false);
        }, 1500);
      },
    });
  }

  ngOnInit() {
    this.timeOut = setInterval(() => {
      this.slide();
      setTimeout(() => {
        const img: any = this.document.querySelector('.poster img');
        // img.classList.remove('animate__fadeIn'); //animate__slideInDown
        img.classList.remove('animate__fadeInUp'); //animate__slideInDown
      }, 3900);
    }, 4000);
  }

  ngOnDestroy() {
    clearTimeout(this.timeOut);
  }

  slide() {
    this.id = this.id - 1;
    if (this.id == 0) {
      this.id = this.nowPlaying.length - 1;
    }
    const x: any = this.document.querySelector('.poster img');
    x.src = this.poster.concat(this.nowPlaying[this.id].backdrop_path);
    // x.classList.add('animate__fadeIn'); //animate__slideInDown
    x.classList.add('animate__fadeInUp'); //animate__slideInDown
  }

  pages(num: number) {
    this.num = num;
    const active = this.document.querySelectorAll('.page-link');
    active.forEach((el: any) => {
      el.addEventListener('click', () => {
        active.forEach((el: any) => {
          el.classList.remove('active');
        });
        el.classList.add('active');
      });
    });
    console.log(num, this.header);
    if (num > 0 && num <= 20) {
      this.nowIsPlay(this.wordMovies, num);
      this.slide();
    }
  }
}

import { similar } from './../../core/interface/movies';
import { Component, Input, EventEmitter } from '@angular/core';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';
import { media } from 'src/app/core/interface/movies';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
})
export class MediaComponent {
  slides: Array<any> = [
    { slide: 'slider-item-1' },
    { slide: 'slider-item-2' },
    { slide: 'slider-item-3' },
    { slide: 'slider-item-4' },
    { slide: 'slider-item-5' },
    { slide: 'slider-item-6' },
    { slide: 'slider-item-7' },
    { slide: 'slider-item-8' },
    { slide: 'slider-item-9' },
  ];

  index: number = 0;
  key: string = '';
  keyVideo: string =
    '?autoplay=1&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1';
  similar: Array<any> = [];
  @Input() id: string = '';
  galleryes: boolean = true;
  media: media[] = [];
  url: string = '//www.youtube.com/embed/';
  constructor(
    private _Review: ReviewService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this._Review.video(this.id).subscribe({
      next: (res) => {
        this.media = res.results;
        console.log(this.media);
      },
    });

    this._Review.similar(this.id).subscribe({
      next: (res) => {
        if (res.results) {
          this.similar = res.results.filter(
            (el: any) => el.poster_path != null
          );
          this.showGallery();
        }
      },
    });
  }

  playVideo(video: any, elem: any) {
    const url = this.url + this.key + this.keyVideo;
    const playNow = this.url + video + this.keyVideo;
    if (this.key) {
      elem.src = url;
    } else {
      elem.src = playNow;
    }
  }

  aria(vid: any) {
    console.log('play');
    if (vid != 'vid') {
      vid.src = '';
    }
  }

  nextVideo(key: string) {
    this.key = key;
  }

  showGallery() {
    const count = 1;
    const updateGallery = this.document.querySelectorAll('.slider-item');
    if (this.similar.length >= 9) {
      updateGallery.forEach((el: any, i: number) => {
        el.classList.add(this.slides[i].slide);
        el.src =
          'https://image.tmdb.org/t/p/w500' + this.similar[i].poster_path;
      });
    } else {
      this.galleryes = false;
    }
  }

  gallery() {
    const updateGallery = this.document.querySelectorAll('.slider-item');
    updateGallery.forEach((el: any, i: number) => {
      el.classList.remove(this.slides[i].slide);
    });
  }

  previeus() {
    this.gallery();
    this.slides.unshift(this.slides.pop());
    this.showGallery();
  }

  nextItem() {
    this.gallery();
    this.slides.push(this.slides.shift()!);
    this.showGallery();
  }
}

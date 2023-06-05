import { Component, ElementRef } from '@angular/core';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent {
  post: string = 'https://image.tmdb.org/t/p/w500';
  favorites: any[] = [];
  formList!: FormGroup;
  lists: any[] = [];
  listItem: Array<any> = [];
  clicked: boolean = false;
  indexEl = 0;
  start: boolean = false;
  toolTip: boolean = false;
  form: boolean = false;
  btnList: boolean = false;
  btn: boolean = true;
  data: any;
  constructor(
    private _Reviews: ReviewService,
    private _Api: ApiServiceService,
    private _FB: FormBuilder
  ) {
    this.showFavorite();
    this.formList = this._FB.group({
      listName: ['', [Validators.required]],
      descList: ['', [Validators.required]],
    });

    this.showAllList();
    Aos.init();
  }

  ratediput(num: number, id: string) {
    const rate = {
      rate: num,
      _id: id,
    };
    console.log(id);

    this._Reviews.rate(rate).subscribe((res) => {});
  }

  ngOnInit() {}

  showAllList() {
    this._Api.showList().subscribe({
      next: (res) => {
        this.listItem = res.data;
        console.log(res, 'list ');
      },
    });
  }

  addNewList() {
    this._Api.addList(this.formList.value).subscribe((res) => {
      this.formList.reset();
      this.form = !this.form;
      this.btn = !this.btn;
    });
  }

  showFavorite() {
    this._Reviews.showFavorite().subscribe((res) => {
      this.favorites = res.data.filter(
        (item: any) => item.favoriteName == 'favorite'
      );
      console.log(res);
    });
  }

  heart(id: string) {
    this._Reviews.delOneFavorite(id).subscribe((res) => {
      this.showFavorite();
      this.showAllList();
    });
  }

  clickOut(i?: number) {
    if (i == this.indexEl) {
      this.clicked = false;
      this.toolTip = false;
      this.form = false;
      this.btn = true;
      this.btnList = false;
    }
  }

  rate(index: number) {
    this.clicked = !this.clicked;
    this.toolTip = false;
    if (index != this.indexEl) this.clicked = true;
  }

  showList(i: number) {
    this.toolTip = !this.toolTip;
    this.clicked = false;
    if (i != this.indexEl) this.toolTip = true;
  }

  listMenu(el?: HTMLElement): void {
    this.btnList = !this.btnList;
  }

  createMenu() {
    this.form = !this.form;
    this.btnList = false;
    this.btn = !this.btn;
  }

  addToList(_id: string, i: number) {
    const form = {
      _idList: _id,
      poster_path: this.favorites[i].poster_path,
      id: this.favorites[i].id,
      overview: this.favorites[i].overview,
    };
    console.log(this.favorites[i].id);
    this._Api.addToList(form).subscribe((res) => {
      console.log(res);
      this.showAllList();
    });
  }
}

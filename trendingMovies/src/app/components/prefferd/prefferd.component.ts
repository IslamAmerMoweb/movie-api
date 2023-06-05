import { Component, Input, Inject } from '@angular/core';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ReviewService } from 'src/app/core/services/movie-reviwes/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-prefferd',
  templateUrl: './prefferd.component.html',
  styleUrls: ['./prefferd.component.scss'],
})
export class PrefferdComponent {
  @Input() index: number = 0;
  @Input() first: any;
  @Input() trend: any[] = [];
  isOpen = false;
  popover: boolean = false;
  filt: string = '';
  firest: boolean = false;
  land: string = '';
  id: number = 0;
  favoriteName: string = 'favorite';
  formList!: FormGroup;
  lists: any[] = [];
  constructor(
    public _Api: ApiServiceService,
    private _FB: FormBuilder,
    private _Reviews: ReviewService,
    @Inject(DOCUMENT) private document: Document,
    private toastr: ToastrService
  ) {
    this.formList = this._FB.group({
      listName: ['', [Validators.required]],
      descList: ['', [Validators.required]],
    });
  }

  ratediput(num: number, index?: number) {
    const rate = {
      rate: num,
      _id: this.trend[this.index].id,
    };
    this.addFavorite(index, 'rated', num);
  }

  outSide(el?: HTMLElement) {
    el?.classList.add('d-none');
  }

  rate(el?: HTMLElement) {
    el?.classList.toggle('d-none');
  }

  closeMenu(i: number) {
    this.popover = false;
    if (i == this.id) {
      this.isOpen = false;
      this.filt = '';
    }
  }

  getChange(i: number) {
    if (i) {
    }
    this.filt = 'filt';
    this.firest = !this.firest;
  }

  menu(i: number) {
    this.isOpen = !this.isOpen;
  }

  createNewList(index: number, form: HTMLElement) {
    this.createList(form);
    this._Api.addList(this.formList.value).subscribe((res) => {
      this.toastr.success('Hello world!', 'Toastr fun!');
    });
    this.formList.reset();
  }

  createList(form: HTMLElement) {
    form.classList.toggle('d-none');
  }
  left: string = '';
  addList(index: number) {
    this.popover = !this.popover;
    if (index % 6 == 5) {
      this.left = 'left';
    }
  }

  addFavorite(index: any, fv?: string, num?: number): void {
    this.popover = false;
    const body = {
      rate: num,
      favoriteName: fv ? fv : 'favorite',
      title: this.trend[index].title,
      overview: this.trend[index].overview,
      poster_path: this.trend[index].poster_path,
      id: this.trend[index].id,
    };
    console.log(body);

    this._Api.favoritWachList(body).subscribe({
      next: (res) => {
        if (res.status == true) {
          this.toastr.success('Hello world!', 'Toastr fun!');
          console.log(res);
        } else {
          this.toastr.error('repated item select another', 'repeated');
          console.log(res);
        }
      },
    });
  }

  watchList(index: number): void {
    this.popover = false;
    const body = {
      favoriteName: 'watchList',
      title: this.trend[index].title,
      overview: this.trend[index].overview,
      poster_path: this.trend[index].poster_path,
      id: this.trend[index].id,
    };
    this._Api.favoritWachList(body).subscribe({
      next: (res) => {
        if (res.status == true) {
          this.toastr.success('enjoy watch', 'added successfull');
        } else {
          this.toastr.error('repeated item', 'choose another');
        }
      },
    });
  }

  showAllList(): void {
    this._Api.showList().subscribe((res) => {
      this.lists = res.data;
    });
  }

  visible(list: HTMLElement) {
    list.classList.toggle('d-block');
    this.showAllList();
  }

  listName(list: HTMLElement, index: number, _id: string) {
    // list.classList.toggle('d-block');
    const body = {
      _idList: _id,
      poster_path: this.trend[index].poster_path,
      id: this.trend[index].id,
      overview: this.trend[index].overview,
    };
    this._Api.addToList(body).subscribe((res) => {
      console.log(res);
      this.showAllList();
    });
  }
}

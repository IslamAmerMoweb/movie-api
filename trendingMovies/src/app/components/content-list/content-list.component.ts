import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { listItem } from 'src/app/core/interface/movies';
import { ApiServiceService } from 'src/app/core/services/api-service.service';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.scss'],
})
export class ContentListComponent {
  userName: string = '';
  editFormList!: FormGroup;
  listDetails: Array<any> = [];
  id: string = '';
  name: string = '';
  list: string = '';
  readonly: boolean = true;
  listItem: listItem[] = [];
  bgImage: string = 'url(../../../assets/images/abstract-ba.jpg)';
  poster: string = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces';
  post: string = 'https://image.tmdb.org/t/p/w500';
  constructor(
    private _ActivateRoute: ActivatedRoute,
    private _Api: ApiServiceService,
    private _FB: FormBuilder
  ) {
    this.userName = localStorage.getItem('name')!;
    this._ActivateRoute.paramMap.subscribe((param) => {
      this.id = param.get('id')!;
    });
    this.newList();
    this.showDetails();
    this.bg();
  }

  bg() {
    this._Api.getBg(this.id).subscribe({
      next: (res) => {
        if (res.data != 'bg') {
          console.log(res.data, 'bg');
          this.bgImage =
            'url(' + res.data.bgName + ')' + 'no-repeat center / cover ';
        }
      },
    });
  }

  ngOnInit() {
    this.editFormList = this._FB.group({
      listName: [this.name, Validators.required],
      descList: [this.list, Validators.required],
    });
  }

  showDetails() {
    this._Api.showList().subscribe({
      next: (res) => {
        this.listDetails = res.data.filter((id: any) => id._id == this.id);
      },
    });
  }

  newList() {
    this._Api.allItem(this.id).subscribe({
      next: (res) => {
        this.listItem = res.data;
      },
    });
  }

  changeBg(bgImg: string) {
    const url = {
      bgList: this.post + bgImg,
      bg: {
        bgName: this.poster + bgImg,
        id: this.id,
      },
    };
    this._Api.addBg(url).subscribe((res) => {
      console.log(res.data);
      this.bg();
    });
    this.bgImage = 'url(' + this.poster + bgImg + ')';
  }

  dataList(btn: HTMLElement, btn2: HTMLElement) {
    this.name = this.listDetails[0].listName;
    this.list = this.listDetails[0].descList;
    this.readonly = false;
    this.ngOnInit();
    btn.classList.add('d-none');
    btn2.classList.add('d-block');
    console.log(this.listDetails[0].listName);
  }

  editList(btn: HTMLElement, btn2: HTMLElement) {
    btn.classList.remove('d-none');
    btn2.classList.remove('d-block');
    this.readonly = true;
    this.editFormList.value;
    const newList = {
      _id: this.id,
      ...this.editFormList.value,
    };
    this._Api.editList(newList).subscribe({
      next: (res) => {
        this.showDetails();
      },
    });
    this.editFormList.reset();
  }

  delOneItem(item: string, image: string) {
    const delList = {
      id: item,
      _id: this.id,
      img: this.post + image,
    };
    this._Api.delOneItem(delList).subscribe((res) => {
      if (res) {
        this.newList();
        this.bg();
      }
    });
  }

  delMany(): void {
    this._Api.delAllItem(this.id).subscribe((res) => {
      if (res) {
        this.listItem = [];
        this.bg();
      }
    });
  }
}

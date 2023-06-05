import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  detect: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private _httpclient: HttpClient, private _Router: Router) {}

  signUP(form: object): Observable<any> {
    return this._httpclient.post(environment.baseUrl + 'signup', form);
  }

  behavior(): void {
    if (localStorage.getItem('token')) {
      const token = JSON.stringify(localStorage.getItem('token'));
      const decode = jwtDecode(token);
      this.userData.next(decode);
    }
  }

  login(form: object): Observable<any> {
    return this._httpclient.post(environment.baseUrl + 'signin', form);
  }

  trendMovies(): Observable<any> {
    return this._httpclient.get(environment.trend('movie'));
  }

  trendDetails(id: string): Observable<any> {
    return this._httpclient.get(environment.details(id));
  }

  popular(num: number): Observable<any> {
    return this._httpclient.get(environment.trend('movie', num));
  }

  images(id: string): Observable<any> {
    return this._httpclient.get(environment.images(id));
  }

  credit(id: string): Observable<any> {
    return this._httpclient.get(environment.credit(id));
  }

  lgout() {
    localStorage.clear();
    this._Router.navigate(['/home']);
    this.userData.next(null);
  }

  addList(form: any): Observable<any> {
    console.log(form, 'service');

    return this._httpclient.post(environment.baseList + 'addList', form);
  }
  showList(): Observable<any> {
    return this._httpclient.get(environment.baseList + 'showList');
  }
  favoritWachList(form: any): Observable<any> {
    return this._httpclient.post(environment.baseList + 'addFavorite', form);
  }

  addToList(form: any): Observable<any> {
    return this._httpclient.post(environment.baseList + 'addToList', form);
  }

  allItem(id: string): Observable<any> {
    return this._httpclient.get(environment.baseList + 'allItem/' + id);
  }

  addBg(url: object): Observable<any> {
    return this._httpclient.post(environment.baseList + 'addBg', url);
  }
  getBg(id: string): Observable<any> {
    return this._httpclient.get(environment.baseList + 'getBg/' + id);
  }

  editList(newList: object): Observable<any> {
    return this._httpclient.post(environment.baseList + 'editList/', newList);
  }

  delOneItem(delList: object): Observable<any> {
    return this._httpclient.delete(environment.baseList + 'delOneItem', {
      body: delList,
    });
  }

  delAllItem(_id: string): Observable<any> {
    return this._httpclient.delete(environment.baseList + 'delAllItem', {
      headers: { _id },
    });
  }
}

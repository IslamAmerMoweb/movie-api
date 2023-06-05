import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MoviesPlay } from 'src/environments/environment.try';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  change: BehaviorSubject<any> = new BehaviorSubject(null);
  isLoading = new BehaviorSubject<boolean>(false);
  constructor(private _HttpClient: HttpClient) {}

  setIsLoading(value: boolean) {
    this.isLoading.next(value);
  }

  getIsLoading() {
    console.log(this.isLoading.getValue(), 'dwwd');
    return this.isLoading.getValue();
  }

  reviews(id: string): Observable<any> {
    return this._HttpClient.get(environment.basReview(id));
  }

  video(id: string): Observable<any> {
    return this._HttpClient.get(environment.video(id));
  }

  similar(id: string): Observable<any> {
    return this._HttpClient.get(environment.similar(id));
  }

  nowPlaying(word: string, num: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.nowPlaying(word, num));
  }

  airingToday(word: string, num: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.airingToday(word, num), {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNzhlYjVmNjc0ZmU0MDZiYWE5MDhiZTgyOWI2ZDQyZiIsInN1YiI6IjY0Mjc3MjE1OWNjNjdiMDYwNTViNTFjZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PauCWDARhZ-C5-eErhaWGe8ThXo7-kz8ioL7qLqGR_A',
      },
    });
  }

  tvDetails(id: string): Observable<any> {
    return this._HttpClient.get(MoviesPlay.tvDetails(id));
  }

  tvCredits(id: string): Observable<any> {
    return this._HttpClient.get(MoviesPlay.tvCredits(id));
  }

  tvSimilar(id: string, page: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.tvSimilar(id, page));
  }

  actors(page: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.actors(page));
  }

  actorsDetails(id: string): Observable<any> {
    return this._HttpClient.get(MoviesPlay.actorsDetails(id));
  }

  peopleCredit(id: string): Observable<any> {
    return this._HttpClient.get(MoviesPlay.peopleCredit(id));
  }

  peopleSearch(name: string, page: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.peopleSearch(name, page));
  }

  tvSearch(name: string, page: number): Observable<any> {
    return this._HttpClient.get(MoviesPlay.tvSearch(name));
  }

  showFavorite(): Observable<any> {
    return this._HttpClient.get(environment.baseList + 'showFavorite');
  }

  delOneFavorite(_id: string): Observable<any> {
    return this._HttpClient.delete(
      environment.baseList + 'delOneFavorite/' + _id
    );
  }

  rate(rate: object): Observable<any> {
    return this._HttpClient.post(environment.baseList + 'rate', { rate });
  }

  allRate(): Observable<any> {
    return this._HttpClient.get(environment.baseList + 'showRate');
  }

  delAllList(): Observable<any> {
    return this._HttpClient.delete(environment.baseList + 'delAllList');
  }
}

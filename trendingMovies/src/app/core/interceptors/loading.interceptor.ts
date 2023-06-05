import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { ReviewService } from '../services/movie-reviwes/review.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _Reviews: ReviewService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // this._Reviews.setIsLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        setTimeout(() => {
          // this._Reviews.setIsLoading(false);
        }, 1000);
      })
    );
  }
}

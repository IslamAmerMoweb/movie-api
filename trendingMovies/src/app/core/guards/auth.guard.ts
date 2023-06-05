import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';

export const Auth = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const { userData } = inject(ApiServiceService);
  const router = inject(Router);
  if (userData.getValue()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

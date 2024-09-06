import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, mapToCanActivate, Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userRole :string = this.authService.user$.getValue();

    if (userRole == null) {
      this.router.navigate(['login']);
      return false;
    }
    if (!route.data['role'].includes(userRole)) {
      this.router.navigate(['accommodations']);
      return false;
    }
    return true;
  }
}


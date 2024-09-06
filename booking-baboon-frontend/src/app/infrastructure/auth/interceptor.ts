import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken: any = localStorage.getItem('user');

    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next.handle(cloned).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            const isTokenExpired = this.isTokenExpired(event);
            if (isTokenExpired) {
              localStorage.removeItem('user');
              this.authService.setUser();
            }
          }
          return event;
        }),
        catchError((error) => {
          if (error.status === 401 || error.status === 403) {
            // Token expired or unauthorized, initiate logout
            localStorage.removeItem('user');
            this.authService.setUser();
          }

          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private isTokenExpired(response: HttpResponse<any>): boolean {
    const expirationTime = this.authService.getExpiration();
    const currentTime = new Date().getTime();

    if (expirationTime) {
      return expirationTime*1000 < currentTime;
    }

    return false;
  }
}

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
import { KeycloakService } from 'src/app/layout/keycloak/keycloak.service';
@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private keycloakService: KeycloakService) {}

  intercept(
    request: HttpRequest<any>,
       next: HttpHandler
     ): Observable<HttpEvent<any>> {
    const token = this.keycloakService.keycloak?.token;
    if (token){
      const authReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(authReq);
    }else{
      return  next.handle(request);
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

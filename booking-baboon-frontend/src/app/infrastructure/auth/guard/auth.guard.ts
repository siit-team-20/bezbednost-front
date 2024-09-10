import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router, mapToCanActivate, Route,
  CanActivateFn,
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../auth.service";
import { KeycloakService } from 'src/app/layout/keycloak/keycloak.service';

export const AuthGuard: CanActivateFn = ()=>{
  const tokenService: KeycloakService = inject(KeycloakService);
  const router: Router = inject(Router);
  if (tokenService.keycloak?.isTokenExpired()){
    router.navigate(['login']);
    return false;
  }
  return true;
}


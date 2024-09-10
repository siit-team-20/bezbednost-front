import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {AuthResponse} from "./model/auth-response.model";
import {JwtHelperService} from "@auth0/angular-jwt";
import {environment} from "../../env/env";
import {Login} from "./model/login.model";
import {User} from "../../layout/users/models/user.model";
import {Host} from "../../layout/users/models/host.model";
import {Guest} from "../../layout/users/models/guest.model";
import { KeycloakService } from 'src/app/layout/keycloak/keycloak.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();
  private router: Router = new Router();

  constructor(private http: HttpClient, private keyCloakService: KeycloakService) {
    this.user$.next(this.getRole());
  }

  login(auth: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(environment.apiHost + 'users/login', auth, {
      headers: this.headers,
    });
  }

  async logout() {
    try {
      localStorage.removeItem('user');
      this.setUser();

      await this.keyCloakService.logout();


      await this.http.get(environment.apiHost + 'users/logout', { responseType: 'text' }).toPromise();
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      console.log(helper.decodeToken(accessToken).realm_access.roles[2]);
      return helper.decodeToken(accessToken).realm_access.roles[2].toString().toUpperCase();
    }
    return null;
  }

  getId(): number | undefined{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      console.log(helper.decodeToken(accessToken)["id"])
      return +helper.decodeToken(accessToken)["id"];
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  registerHost(user: Host): Observable<Host> {
    return this.http.post<Host>(environment.apiHost+'hosts/',user)
  }

  registerGuest(user: Guest): Observable<Guest> {
    return this.http.post<Guest>(environment.apiHost+'guests/',user)
  }

  getUser() {
    return this.user$;
  }

  getExpiration() : number | undefined{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return +helper.decodeToken(accessToken)["exp"];
    }
    return undefined;
  }

  getEmail() : string | undefined{
    if(this.isLoggedIn()){
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(accessToken);
      return decodedToken.preferred_username;
    }
    return undefined;
  }
}

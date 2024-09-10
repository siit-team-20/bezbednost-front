import { Injectable } from '@angular/core';
import { User } from '../users/models/user.model';
import Keycloak from 'keycloak-js';
import { UserProfile } from './model/UserProfile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor() { }

  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  get keycloak(){
    if (!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:8090',
        realm: 'BookingApp',
        clientId: 'booking-app'
      })
    }
    return this._keycloak;
  }

  get profile() : UserProfile|undefined{
    return this._profile
  }

  async init(): Promise<void> {
    try {
      console.log('Authenticating the user...');
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
      });

      console.log('Keycloak init completed. Authenticated:', authenticated);

      if (authenticated) {
        console.log('User authenticated');
        const profile = await this.keycloak.loadUserProfile();
        this._profile = {
          ...profile,
          token: this.keycloak.token
        };
        console.log('User profile loaded:', this._profile);
        console.log(this._profile?.token)
        localStorage.setItem("user",<string>this._profile?.token?.toString())
      } else {
        console.warn('User not authenticated');
      }
    } catch (error) {
      console.error('Error during Keycloak initialization', error);
    }
  }

  login(){
    return this.keycloak?.login();
  }

  logout(){
    return this.keycloak?.logout({redirectUri: 'https://localhost:4200'})
  }
}

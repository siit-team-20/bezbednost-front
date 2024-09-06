import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {Guest} from "../models/guest.model";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {NotificationType} from "../models/NotificationType.module";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Guest[]> {
    return this.httpClient.get<Guest[]>(environment.apiHost + 'guests')
  }

  get(id: number): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + 'guests/' + id)
  }

  delete(id: number | undefined): Observable<Guest> {
    return this.httpClient.delete(environment.apiHost + 'guests/' + id)
  }
  getByEmail(email: string): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + 'guests/email/' + email)
  }

/*  getProfile(email: string): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + 'guests/profile/' + email)
  }*/

  getProfile(userId: number): Observable<Guest> {
    return this.httpClient.get<Guest>(environment.apiHost + 'guests/profile/' + userId)
  }


  update(guest: Guest): Observable<Guest> {
    return this.httpClient.put<Guest>(environment.apiHost + 'guests/', guest)
  }

  addFavorite(guestId: number | undefined, accommodationId: number | undefined){
    const url = `${environment.apiHost}guests/${guestId}/favorite-accommodations/add/${accommodationId}`;

    return this.httpClient.put<Guest>(url, null);
  }

  removeFavorite(guestId: number | undefined, accommodationId: number | undefined){
    const url = `${environment.apiHost}guests/${guestId}/favorite-accommodations/remove/${accommodationId}`;

    return this.httpClient.put<Guest>(url, null);
  }

  getFavorites(guestId: number | undefined): Observable<Accommodation[]>{
    const url = `${environment.apiHost}guests/${guestId}/favorite-accommodations`;

    return this.httpClient.get<Accommodation[]>(url);
  }

  // add(guest.model: Guest): Observable<Guest> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<Guest>(environment.apiGuest + 'guest.models', guest.model)
  // }


}

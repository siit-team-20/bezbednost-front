import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Reservation} from "./models/reservation.model";
import {Accommodation} from "../accommodations/shared/models/accommodation.model";
import {TimeSlot} from "../accommodations/shared/models/timeslot.model";
import {Guest} from "../users/models/guest.model";
import {ReservationRequest} from "./models/reservation-request.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'reservations')
  }

  getReservation(id: number): Observable<Reservation> {
    return this.httpClient.get<Reservation>(environment.apiHost + 'reservations/' + id)
  }

  create(reservationRequest: ReservationRequest): Observable<Reservation>{
    return this.httpClient.post<Reservation>(environment.apiHost + 'reservations', reservationRequest);
  }

  getAllForGuest(id: number | undefined): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'reservations/guest/' + id)
  }

  getAllForHost(id: number | undefined): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'reservations/host/' + id)
  }

  getCancellationCount(id: number | undefined): Observable<number>{
    return this.httpClient.get<number>(environment.apiHost + 'reservations/cancellation-count/' + id)
  }

  approve(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/approve", {})
  }

  deny(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/deny", {})  }

  cancel(id: number): Observable<Reservation> {
    return this.httpClient.put<Reservation>(environment.apiHost + 'reservations/' + id + "/cancel", {})  }

  cancelAllForGuest(guestId: number): Observable<Reservation[]> {
    return this.httpClient.put<Reservation[]>(environment.apiHost + 'reservations/cancelAllForGuest/' + guestId, {})  }
}

import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Accommodation} from "../shared/models/accommodation.model";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {AccommodationModification} from "./model/accommodation-modification.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationModificationService {

  constructor(private httpClient: HttpClient) {
  }


  getAll(): Observable<AccommodationModification[]> {
    return this.httpClient.get<AccommodationModification[]>(environment.apiHost + 'accommodation-modifications')
  }
  get(id: number): Observable<AccommodationModification> {
    return this.httpClient.get<AccommodationModification>(environment.apiHost + 'accommodation-modifications/' + id)
  }
  create(accommodationModification: AccommodationModification): Observable<AccommodationModification> {
    return this.httpClient.post<AccommodationModification>(environment.apiHost + 'accommodation-modifications', accommodationModification)
  }
  delete(accommodationModificationId: number): Observable<AccommodationModification> {
    return this.httpClient.delete<AccommodationModification>(environment.apiHost + 'accommodation-modifications/' + accommodationModificationId)
  }
  approve(id: number): Observable<AccommodationModification> {
    return this.httpClient.put<AccommodationModification>(environment.apiHost + 'accommodation-modifications/approve/' + id, id);
  }
  deny(id: number): Observable<AccommodationModification> {
    return this.httpClient.put<AccommodationModification>(environment.apiHost + 'accommodation-modifications/deny/' + id, id);
  }
  addPeriod(accommodationModificationId: number, periodId: number | undefined): Observable<AccommodationModification> {
    return this.httpClient.put<AccommodationModification>(environment.apiHost + 'accommodation-modifications/' + accommodationModificationId + "/addPeriod/" + periodId,{});
  }

}

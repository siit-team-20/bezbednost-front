import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Accommodation} from "../models/accommodation.model";
import {environment} from "../../../../env/env";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AccommodationFilter} from "../../search/models/accommodationFilter.model";
import {AvailablePeriod} from "../models/available-period.model";
import {Guest} from "../../../users/models/guest.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations')
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'accommodations/' + id)
  }
  create(accommodation: Accommodation) : Observable<Accommodation> {
    return this.httpClient.post<Accommodation>(environment.apiHost + 'accommodations', accommodation);
  }

  update(accommodation: Accommodation) : Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations', accommodation);
  }

  delete(accommodationId: number) : Observable<Accommodation> {
    return this.httpClient.delete<Accommodation>(environment.apiHost + 'accommodations/' + accommodationId);
  }
  search(filter : AccommodationFilter): Observable<Accommodation[]> {
    console.log(this.convertFilterToQueryString(filter));
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/filter' + this.convertFilterToQueryString(filter))
  }

  convertFilterToQueryString(filter: AccommodationFilter): string {
    const queryParams: string[] = [];

    if (filter.city !== undefined && filter.city !== null && filter.city.length > 0) {
      queryParams.push("city=" + encodeURIComponent(filter.city));
    }
    if (filter.checkin !== undefined && filter.checkin !== null && filter.checkin.length > 0) {
      queryParams.push("checkin=" + encodeURIComponent(filter.checkin));
    }
    if (filter.checkout !== undefined && filter.checkout !== null && filter.checkout.length > 0) {
      queryParams.push("checkout=" + encodeURIComponent(filter.checkout));
    }
    if (filter.guestNum !== undefined && filter.guestNum > 0) {
      queryParams.push("guestNum=" + filter.guestNum);
    }
    if (filter.minPrice !== undefined && filter.minPrice !== null) {
      queryParams.push("min-price=" + filter.minPrice);
    }
    if (filter.maxPrice !== undefined && filter.maxPrice !== null) {
      queryParams.push("max-price=" + filter.maxPrice);
    }
    if (filter.amenities !== undefined && filter.amenities.length > 0) {
      const encodedAmenities = filter.amenities.map(amenity => encodeURIComponent(amenity)).join(",");
      queryParams.push("amenities=" + encodedAmenities);
    }
    if (filter.types !== undefined && filter.types.length > 0) {
      const encodedTypes = filter.types.map(type => encodeURIComponent(type)).join(",");
      queryParams.push("property-type=" + encodedTypes);
    }
    if (filter.minRating !== undefined && filter.minRating !== null) {
      queryParams.push("min-rating=" + filter.minRating);
    }

    return queryParams.length > 0 ? "?" + queryParams.join("&") : "";
  }

  getAccommodationsByHost(id: number): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'accommodations/host/' + id)
  }

  calculateTotalPrice(accommodationId: number, checkin: string, checkout: string): Observable<number> {
    const params = new HttpParams()
      .set('checkin', checkin)
      .set('checkout', checkout);

    return this.httpClient.get<number>(`${environment.apiHost}accommodations/${accommodationId}/total-price`, { params });
  }

  createPeriod(period: AvailablePeriod): Observable<AvailablePeriod>{
    if (!period.timeSlot?.startDate || !period.timeSlot?.endDate) throw new Error()
      const body= {
        timeSlot: {
          startDate: new Date(period.timeSlot.startDate),
          endDate: new Date(period.timeSlot.endDate)
        },
        pricePerNight: period.pricePerNight
      }


    return this.httpClient.post<AvailablePeriod>(environment.apiHost + 'available-periods',body)
  }

  addPeriod(accommodationId: number, periodId: number | undefined): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/' + accommodationId + "/addPeriod/" + periodId,{});
  }

  editAvailablePeriod(availablePeriod: AvailablePeriod){
    return this.httpClient.put<AvailablePeriod>(environment.apiHost+'available-periods',availablePeriod)
  }

  createAvailablePeriod(availablePeriod: AvailablePeriod){
    return this.httpClient.post<AvailablePeriod>(environment.apiHost+'available-periods',availablePeriod)
  }

  getAvailablePeriod(periodId: number){
    return this.httpClient.get<AvailablePeriod>(environment.apiHost+'available-periods/'+periodId)
  }

  removePeriod(accommodationId: number,periodId: number){
    return this.httpClient.delete(environment.apiHost+'accommodations/'+ accommodationId+'/available-periods/' + periodId)
  }

  updateEditingStatus(accommodationId: number, isBeingEdited: Boolean) : Observable<Accommodation> {
/*    const body = {
      accommodationId: accommodationId,
      isBeingEdited: isBeingEdited
    }*/
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/' + accommodationId + '/updateEditingStatus/' + isBeingEdited, {});
  }
  setAutoAccepts(id: number | undefined, autoAccept: boolean) {
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/' + id + '/update-auto-accept/' + autoAccept, {});
  }

  updateCancellationDeadline(accommodationId: number, value: number): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + 'accommodations/'+ accommodationId + '/cancellation-deadline/' + value, {});
  }
}

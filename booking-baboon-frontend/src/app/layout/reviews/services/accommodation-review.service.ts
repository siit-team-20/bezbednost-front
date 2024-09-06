import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {AccommodationReview} from "../model/accommodation-review.model";
import {HostReview} from "../model/host-review.model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationReviewService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<AccommodationReview[]> {
    return this.httpClient.get<AccommodationReview[]>(environment.apiHost + 'accommodation-reviews')
  }

  getAccommodationReview(id: number): Observable<AccommodationReview> {
    return this.httpClient.get<AccommodationReview>(environment.apiHost + 'accommodation-reviews/' + id)
  }

  getAverageRatingFromAccommodation(accommodationId: number | undefined): Observable<number> {
    return this.httpClient.get<number>(environment.apiHost + 'accommodation-reviews/average-rating/' + accommodationId)
  }

  getAccommodationReviews(accommodationId: number | undefined): Observable<AccommodationReview[]>{
    return this.httpClient.get<AccommodationReview[]>(environment.apiHost + 'accommodation-reviews/accommodation/' + accommodationId)
  }


  create(review: AccommodationReview): Observable<AccommodationReview> {
    return this.httpClient.post<AccommodationReview>(environment.apiHost + 'accommodation-reviews/' , review)
  }

  getReviewsByGuest(guestId: number | undefined): Observable<AccommodationReview[]>{
    return this.httpClient.get<AccommodationReview[]>(environment.apiHost + 'accommodation-reviews/guest/' + guestId)
  }

  remove(id: number | undefined): Observable<AccommodationReview> {
    return this.httpClient.delete<AccommodationReview>(environment.apiHost + 'accommodation-reviews/' + id)
  }
}

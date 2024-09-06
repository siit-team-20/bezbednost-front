import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccommodationReview} from "../model/accommodation-review.model";
import {environment} from "../../../env/env";
import {HostReview} from "../model/host-review.model";

@Injectable({
  providedIn: 'root'
})
export class HostReviewService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<HostReview[]> {
    return this.httpClient.get<HostReview[]>(environment.apiHost + 'host-reviews')
  }

  getHostReview(id: number): Observable<HostReview> {
    return this.httpClient.get<HostReview>(environment.apiHost + 'host-reviews/' + id)
  }

  getAverageRatingForHost(hostId: number | undefined): Observable<number> {
    return this.httpClient.get<number>(environment.apiHost + 'host-reviews/average-rating/' + hostId)
  }

  getReviewsByHost(hostId: number | undefined): Observable<HostReview[]>{
    return this.httpClient.get<HostReview[]>(environment.apiHost + 'host-reviews/host/' + hostId)
  }

  create(review: HostReview): Observable<HostReview>{
    return this.httpClient.post<HostReview>(environment.apiHost + 'host-reviews/', review)
  }

  getReviewsByGuest(guestId: number | undefined): Observable<HostReview[]>{
    return this.httpClient.get<HostReview[]>(environment.apiHost + 'host-reviews/guest/' + guestId)
  }

  remove(id: number | undefined): Observable<HostReview> {
    return this.httpClient.delete<HostReview>(environment.apiHost + 'host-reviews/' + id)
  }
}

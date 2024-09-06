import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HostReview} from "../model/host-review.model";
import {environment} from "../../../env/env";
import {Review} from "../model/review.model";
import {ReviewReport} from "../../reports/models/review-report.model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Review[]> {
    return this.httpClient.get<Review[]>(environment.apiHost + 'reviews')
  }

  getReview(id: number): Observable<Review> {
    return this.httpClient.get<Review>(environment.apiHost + 'reviews/' + id)
  }

  remove(reviewId: number): Observable<ReviewReport> {
    return this.httpClient.delete<ReviewReport>(environment.apiHost + 'reviews/' + reviewId);
  }
}

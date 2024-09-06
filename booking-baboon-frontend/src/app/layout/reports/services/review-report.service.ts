import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GuestReport} from "../models/guest-report.model";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {ReviewReport} from "../models/review-report.model";

@Injectable({
  providedIn: 'root'
})
export class  ReviewReportService {

  constructor(private httpClient: HttpClient) { }

  create(report: ReviewReport): Observable<ReviewReport> {
    return this.httpClient.post<ReviewReport>(environment.apiHost + 'review-reports/', report);
  }

  getAll(): Observable<ReviewReport[]> {
    return this.httpClient.get<ReviewReport[]>(environment.apiHost + 'review-reports');
  }

  remove(reviewReportId: number): Observable<ReviewReport> {
    return this.httpClient.delete<ReviewReport>(environment.apiHost + 'review-reports/' + reviewReportId);
  }
}

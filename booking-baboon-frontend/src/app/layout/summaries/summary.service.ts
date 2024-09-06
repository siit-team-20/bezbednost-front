import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../accommodations/shared/models/accommodation.model";
import {environment} from "../../env/env";
import {AccommodationFilter} from "../accommodations/search/models/accommodationFilter.model";
import {AvailablePeriod} from "../accommodations/shared/models/available-period.model";
import {AccommodationMonthlySummary} from "./models/AccommodationMonthlySummary";
import {PeriodSummary} from "./models/PeriodSummary";

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  constructor(private httpClient: HttpClient) {
  }

  getMonthlySummary(id: number | undefined): Observable<AccommodationMonthlySummary>{
    return this.httpClient.get<AccommodationMonthlySummary>(environment.apiHost + 'summary/monthly/' + id);
  }

  getPeriodSummary(hostId: number, startDate: string, endDate: string): Observable<PeriodSummary> {
    const params = new HttpParams()
      .set('host-id', hostId)
      .set('start-date', startDate)
      .set('end-date', endDate);

    return this.httpClient.get<PeriodSummary>(environment.apiHost + 'summary/period', { params });
  }

  getPeriodSummaryPdf(hostId: number, startDate: string, endDate: string): Observable<Blob> {
    const params = new HttpParams()
      .set('host-id', hostId)
      .set('start-date', startDate)
      .set('end-date', endDate);

    return this.httpClient.get(environment.apiHost + 'summary/period/pdf', {
      params,
      responseType: 'blob'
    });
  }

  getMonthlySummaryPdf(id: number | undefined): Observable<Blob>{
    return this.httpClient.get(`${environment.apiHost}summary/monthly/${id}/pdf`, {responseType: 'blob'});

  }


}

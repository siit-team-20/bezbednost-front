import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostReport} from "../models/host-report.model";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {GuestReport} from "../models/guest-report.model";

@Injectable({
  providedIn: 'root'
})
export class GuestReportService {

  constructor(private httpClient: HttpClient) { }

  create(report: GuestReport): Observable<GuestReport> {
    return this.httpClient.post<GuestReport>(environment.apiHost + 'guest-reports/', report);
  }
}

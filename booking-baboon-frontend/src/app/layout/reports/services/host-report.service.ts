import { Injectable } from '@angular/core';
import {HostReport} from "../models/host-report.model";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HostReportService {

  constructor(private httpClient: HttpClient) { }

  create(report: HostReport): Observable<HostReport> {
    return this.httpClient.post<HostReport>(environment.apiHost + 'host-reports/', report);
  }

}

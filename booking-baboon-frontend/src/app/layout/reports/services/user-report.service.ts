import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ReviewReport} from "../models/review-report.model";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {UserReport} from "../models/user-report.model";

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<UserReport[]> {
    return this.httpClient.get<UserReport[]>(environment.apiHost + 'user-reports');
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../models/accommodation.model";
import {environment} from "../../../../env/env";

@Injectable({
  providedIn: 'root'
})
export class AmenityService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'amenities')
  }
}

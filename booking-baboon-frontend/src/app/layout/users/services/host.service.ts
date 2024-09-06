import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {Host} from "../models/host.model";
import {NotificationType} from "../models/NotificationType.module";
import {Guest} from "../models/guest.model";

@Injectable({
  providedIn: 'root'
})
export class HostService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Host[]> {
    return this.httpClient.get<Host[]>(environment.apiHost + 'hosts')
  }

  get(id: number): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/' + id)
  }
  getProfileByEmail(email: string): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/profile/email/' + email)
  }

  getProfile(id: number | undefined): Observable<Host> {
    return this.httpClient.get<Host>(environment.apiHost + 'hosts/profile/' + id)
  }

  delete(id: number | undefined): Observable<Host> {
    return this.httpClient.delete(environment.apiHost + 'hosts/' + id)
  }

  update(host: Host): Observable<Host> {
    return this.httpClient.put<Host>(environment.apiHost + 'hosts/', host)
  }


  // add(host.model: Host): Observable<Host> {
//     headers: {
//       'Content-Type': 'application/json',
//       // Add any other headers if needed
//     }
  //   return this.httpClient.post<Host>(environment.apiHost + 'host.models', host.model)
  // }


}

import { Injectable } from '@angular/core';
import {Guest} from "../models/guest.model";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../models/admin.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  update(admin: Admin): Observable<Admin> {
    return this.httpClient.put<Admin>(environment.apiHost + 'admins/', admin)
  }
}

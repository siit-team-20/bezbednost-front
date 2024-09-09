import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/env';
import { Certificate } from '../models/certificate';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  root = 'certificates';


  constructor(private httpClient: HttpClient){}

  getAll(): Observable<Certificate> {
    return this.httpClient.get<Certificate>(environment.apiHost + this.root)
  }

  get(alias: string): Observable<Certificate> {
    return this.httpClient.get<Certificate>(environment.apiHost + 'certificates/' + alias)
    }
}

//proveri

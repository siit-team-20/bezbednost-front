import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/env';
import { Certificate } from '../models/certificate';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {


  constructor(private httpClient: HttpClient){}

  getAllChildren(alias : string): Observable<Certificate[]> {
    return this.httpClient.get<Certificate[]>(environment.apiHost + 'certificates/' + alias + '/children')
  }

  get(alias: string): Observable<Certificate> {
    return this.httpClient.get<Certificate>(environment.apiHost + 'certificates/' + alias)
    }
}

//proveri

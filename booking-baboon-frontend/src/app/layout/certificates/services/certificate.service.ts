import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/env';
import { Certificate } from '../models/certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  root = 'certificates';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Certificate> {
    return this.httpClient.get<Certificate>(environment.apiHost + this.root)
  }
  
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/env/env';
import { CertificateRequest } from '../models/certificate-request';
import { CreateCertificate } from '../models/create-certificate';

@Injectable({
  providedIn: 'root'
})
export class CertificateRequestService {

  root = 'certificate-requests';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<CertificateRequest[]> {
    return this.httpClient.get<CertificateRequest[]>(environment.apiHost + this.root);
  } 

  create(request: CertificateRequest) : Observable<CertificateRequest> {
    return this.httpClient.post<CertificateRequest>(environment.apiHost + this.root, request);
  }

  approve(id: number, certificate: CreateCertificate): Observable<CertificateRequest> {
    return this.httpClient.put<CertificateRequest>(environment.apiHost + this.root + "/" + id + "/approve", certificate);
  }
}

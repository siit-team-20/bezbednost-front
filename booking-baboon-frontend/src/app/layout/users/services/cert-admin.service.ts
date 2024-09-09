import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CertAdmin } from '../models/cert.admin.model';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';
import { environment } from 'src/app/env/env';

@Injectable({
  providedIn: 'root'
})
export class CertAdminService {

  constructor(private httpClient: HttpClient) { }

  update(certAdmin: CertAdmin): Observable<Admin> {
    return this.httpClient.put<Admin>(environment.apiHost + 'certadmin/', certAdmin)
  }
}

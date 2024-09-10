import { Component, OnInit } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestService } from '../services/certificate-request.service';

@Component({
  selector: 'app-certificate-request-page',
  templateUrl: './certificate-request-page.component.html',
  styleUrls: ['./certificate-request-page.component.css']
})
export class CertificateRequestPageComponent implements OnInit {

  certificateRequests!: CertificateRequest[];

  constructor(private certificateRequestService: CertificateRequestService) {
  }
  ngOnInit() {
    this.load()
  }
  load(): void {
    this.certificateRequestService.getAll().subscribe({
      next: (data: CertificateRequest[]) => {
        this.certificateRequests = data;
        console.log(data);
      }
    })
  }

  // load(): void {
  //   this.certificateRequestService.getAll().subscribe({
  //     next: (data: CertificateRequest[]) => {
  //       const certificateRequest: CertificateRequest = {
  //         subjectEmail: data.subjectEmail,
  //         subjectCommonName: data.subjectCommonName,
  //         subjectOrganization: data.subjectOrganization,
  //         subjectOrganizationUnit: data.subjectOrganizationUnit,
  //         subjectLocation: data.subjectLocation,
  //         subjectState: data.subjectState,
  //         subjectCountry: data.subjectCountry,
  //         status: data.status
  //       }
  //     console.log(certificateRequest);
  //     }
  //   })
  // }


}

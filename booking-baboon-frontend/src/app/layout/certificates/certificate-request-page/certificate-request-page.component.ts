import { Component, OnInit } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestService } from '../services/certificate-request.service';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-request-page',
  templateUrl: './certificate-request-page.component.html',
  styleUrls: ['./certificate-request-page.component.css']
})
export class CertificateRequestPageComponent implements OnInit {

  certificateRequests!: CertificateRequest[];
  protected aliases: string[] | undefined;

  constructor(private certificateRequestService: CertificateRequestService) {}

  ngOnInit() {
    this.load()
  }
  
  private getAliases(certificateTree: Certificate[] | undefined): void {
    certificateTree?.forEach((certificate: Certificate): void => {
      if (certificate.children.length === 0)
        this.aliases?.push(certificate.issuer.email + "|" + certificate.serialNumber);

      this.getAliases(certificate.children);
    });
  }
  
  load(): void {
    this.certificateRequestService.getAllWaiting().subscribe({
      next: (data: CertificateRequest[]) => {
        this.certificateRequests = data;
        console.log(data);
      }
    })
  }


}

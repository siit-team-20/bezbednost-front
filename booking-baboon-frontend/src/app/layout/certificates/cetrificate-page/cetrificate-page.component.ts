import { Component } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestStatus } from '../models/certificate-request-status';
import { CertificateRequestService } from '../services/certificate-request.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../models/certificate';
import { CreateCertificate } from '../models/create-certificate';
import { X500Name } from '../models/x500-name';

@Component({
  selector: 'app-cetrificate-page',
  templateUrl: './cetrificate-page.component.html',
  styleUrls: ['./cetrificate-page.component.css']
})
export class CetrificatePageComponent {

  aliases: string[] | undefined;

  constructor(private certificateRequestService: CertificateRequestService, private certificateService: CertificateService, private authService: AuthService) {}

  load(): void {
    this.certificateRequestService.getAll().subscribe({
      next: (data: CertificateRequest[]) => {
        console.log(data);
      }
    })
  }

  private getAliases(certificate: Certificate[] | undefined) : void {
    certificate?.forEach((cert: Certificate) : void => {
      if (cert.children.length == 0) 
        this.aliases?.push(cert.issuer.email + "|" + cert.serialNumber);
      this.getAliases(cert.children);
    })
  }

  loadCerts(): void {
    this.certificateService.getAll().subscribe({
      next: (data: Certificate) => {
        console.log(data)
        const certificate: Certificate = {
          serialNumber: data.serialNumber,
          signatureAlgorithm: data.signatureAlgorithm,
          issuer: data.issuer,
          startDate: data.startDate,
          endDate: data.endDate,
          subject: data.subject,
          extensions: data.extensions,
          endEntity: data.endEntity,
          root: data.root,
          children: data.children
        }
        console.log(data);
        this.aliases = [];
        this.getAliases([certificate]);
        console.log(this.aliases);
      }
    })
  }

  approve(): void {
    const subject: X500Name = {
      email: 'andrija.slovic13@gmail.com',
      commonName: 'Andrija Slovic',
      organization: 'FTN',
      organizationalUnit: 'SIIT',
      location: 'Novi Sad',
      state: 'Vojvodina',
      country: 'Srbija'
    }
    const certificate: CreateCertificate = {
      certificateType: 'DigitalSigning',
      alias: 'andrija.slovic1@gmail.com',
      subject: subject,
      domain: null
    }
    this.certificateRequestService.approve(302, certificate).subscribe({
      next: (data: CertificateRequest) => {
        console.log(data);
      }
    })
  }

  submit(): void {
    const certificateRequest: CertificateRequest = {
      subjectEmail: 'andrija.slovic13@gmail.com',
      subjectCommonName: 'Andrija Slovic',
      subjectOrganization: 'FTN',
      subjectOrganizationUnit: 'SIIT',
      subjectLocation: 'Novi Sad',
      subjectState: 'Vojvodina',
      subjectCountry: 'Srbija',
      status: CertificateRequestStatus.WAITING
    }

    this.certificateRequestService.create(certificateRequest).subscribe({
      next: (data: CertificateRequest) => {
        if (data != null) {
          console.log(certificateRequest);
        }
      }
    })
  }

}

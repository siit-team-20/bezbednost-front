import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../models/certificate';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestStatus } from '../models/certificate-request-status';
import { CertificateRequestService } from '../services/certificate-request.service';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CreateCertificate } from '../models/create-certificate';
import { X500Name } from '../models/x500-name';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cetrificate-page',
  templateUrl: './cetrificate-page.component.html',
  styleUrls: ['./cetrificate-page.component.css']
})
export class CetrificatePageComponent implements OnInit {

  aliases: string[] | undefined;
  rootCertificate!: Certificate;


certificates!: Certificate[];

  // Define a dummy object for testing
  // dummyCertificate: Certificate = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   extensions: [
  //     CertificateExtension.BASIC_CONSTRAINT,
  //     CertificateExtension.DIGITAL_SIGNATURE
  //   ],
  //   subject: {
  //     commonName: 'John Doe',
  //     surname: 'Doe',
  //     givenName: 'John',
  //     organization: 'Example Corp',
  //     organizationalUnit: 'IT Department',
  //     country: 'USA',
  //     email: 'john@example.com',
  //     userId: 'johndoe123'
  //   },
  //   alias: 'test',
  // };

  // // Define an array of dummy objects for testing
  // certificates: Certificate[] = [this.dummyCertificate, this.dummyCertificate];


   certificate = {
    type: '',
    alias: '',
    subject: '',
    domain: ''
  };

  constructor(private certificateRequestService: CertificateRequestService, private certificateService: CertificateService) {}


 

  newCertificate(): void {
    console.log('Certificate data:', this.certificate);
    // You can add logic here to send the data to your server or handle it as needed
  }


  ngOnInit() {
    // this.loadRoot()
  }

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
        this.rootCertificate = certificate;
      }
    })
  }

  addCert(): void {
    const subject: X500Name = {
      email: 'test@gmail.com',
      commonName: 'Test Test',
      organization: 'FTN',
      organizationalUnit: 'SIIT',
      location: 'Novi Sad',
      state: 'Vojvodina',
      country: 'Srbija'
    }
    const certificate: CreateCertificate = {
      certificateType: 'Intermediate',
      alias: 'andrija.slovic1@gmail.com|191d96185c4',
      subject: subject,
      domain: null
    }
    this.certificateService.create(certificate).subscribe({
      next: (data: CreateCertificate) => {
        console.log(data)
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

  loadRoot(): void {
    this.certificateService.get("root").subscribe({
      next: (data: Certificate) => {
        this.rootCertificate = data;

      },
      error: (_) => {
        console.log("Error!");
      }
    });
  }

}

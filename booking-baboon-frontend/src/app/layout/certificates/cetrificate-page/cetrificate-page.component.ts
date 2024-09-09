import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../models/certificate';
import { CertificateExtension } from '../models/certifacte.extension';

@Component({
  selector: 'app-cetrificate-page',
  templateUrl: './cetrificate-page.component.html',
  styleUrls: ['./cetrificate-page.component.css']
})
export class CetrificatePageComponent implements OnInit {
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


  constructor(private certificateService: CertificateService) {
  }

  ngOnInit() {
    this.loadRoot()
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

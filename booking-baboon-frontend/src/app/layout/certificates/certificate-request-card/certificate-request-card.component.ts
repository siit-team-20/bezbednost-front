import { Component, Input } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestService } from '../services/certificate-request.service';
import { SharedService } from 'src/app/shared/shared.service';
import { CertificateRequestStatus } from '../models/certificate-request-status';

@Component({
  selector: 'app-certificate-request-card',
  templateUrl: './certificate-request-card.component.html',
  styleUrls: ['./certificate-request-card.component.css']
})
export class CertificateRequestCardComponent {
  @Input()
  certificateRequest!: CertificateRequest;


  constructor(private certificateRequestService: CertificateRequestService) {
  }


 


  onApproveClicked() {
    // this.certificateRequestService.approve(this.certificateRequest.id).subscribe({
    //   next: (data: CertificateRequest) => {
    //     if (data.status === CertificateRequestStatus.APPROVED) {
    //       this.sharedService.openSnack("Certificate request has been approved successfully");
    //     }
    //   },
    //   error: (_) => {
    //     console.log("Error!");
    //     this.sharedService.openSnack("Certificate request has not been approved");
    //   }
    // });
  }

  onDenyClicked() {
  //   this.certificateRequestService.deny(this.certificateRequest.id).subscribe({
  //     next: (data: CertificateRequest) => {
  //       if (data.status === CertificateRequestStatus.DENIED) {
  //         this.sharedService.openSnack("Certificate request has been denied successfully");
  //       }
  //     },
  //     error: (_) => {
  //       console.log("Error!");
  //       this.sharedService.openSnack("Certificate request has not been denied");
  //     }
  //   });
  }

}

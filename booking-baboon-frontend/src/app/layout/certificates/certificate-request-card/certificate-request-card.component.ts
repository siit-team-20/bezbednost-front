import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestService } from '../services/certificate-request.service';
import {MatDialog} from "@angular/material/dialog";
import { SharedService } from 'src/app/shared/shared.service';
import { CertificateRequestStatus } from '../models/certificate-request-status';
import { AcceptCertificateRequestComponent } from '../accept-certificate-request/accept-certificate-request.component';

@Component({
  selector: 'app-certificate-request-card',
  templateUrl: './certificate-request-card.component.html',
  styleUrls: ['./certificate-request-card.component.css']
})
export class CertificateRequestCardComponent {
  @Input() certificateRequest!: CertificateRequest;
  @Input() aliases: string[] | undefined;
  @Output() requestAccepted: EventEmitter<any> = new EventEmitter<any>();


  constructor(private dialog: MatDialog, private certificateRequestService: CertificateRequestService, private sharedService: SharedService) {
  }


  onApproveClicked(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(AcceptCertificateRequestComponent, {
      data: {
        id: this.certificateRequest?.id,
        subject: {
          email: this.certificateRequest?.subjectEmail,
          commonName: this.certificateRequest?.subjectCommonName,
          organizationalUnit: this.certificateRequest?.subjectOrganizationUnit,
          organization: this.certificateRequest?.subjectOrganization,
          location: this.certificateRequest?.subjectLocation,
          state: this.certificateRequest?.subjectState,
          country: this.certificateRequest?.subjectCountry,
        },
        aliases: this.aliases,
      },
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe({
      next: dialogResult => {
        if (dialogResult) {
          this.sharedService.openSnack('Certificate request successfully accepted.');
          this.requestAccepted.emit();
        }
      }
    });
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
    if (this.certificateRequest.id != undefined){
      this.certificateRequestService.deny(this.certificateRequest.id).subscribe({
        next: (data: CertificateRequest) => {
          if (data.status === CertificateRequestStatus.REJECTED) {
            this.sharedService.openSnack("Certificate request has been denied successfully");
          }
        },
        error: (_) => {
          console.log("Error!");
          this.sharedService.openSnack("Certificate request has not been denied");
        }
      });
    }
  }

}

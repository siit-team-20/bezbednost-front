import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Certificate } from '../models/certificate';
import { CertificateService } from '../services/certificate.service';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.css']
})
export class CertificateCardComponent {
  
  @Input()
  certificate!: Certificate;
  children! : Certificate []
  isDropped = false;
  @Output() certificateSelected: EventEmitter<Certificate> = new EventEmitter<Certificate>();

  constructor(private certificateService: CertificateService){

  }
  

  // loadChildren(): void {
  //   this.certificateService.getAllChildren(this.certificate.alias).subscribe({
  //     next: (data: Certificate[]) => {
  //       this.children = data;
  //     },
  //     error: (_) => {
  //       console.log("Error!");
  //     }
  //   });
  // }


  parseSimpleDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    };
    return date.toLocaleString('en-US', options);
  }

  onIssueClicked() {
    if (this.certificate) {
      this.certificateSelected.emit(this.certificate);
    }
  }

  onRevokeClicked() {
    

  }

  onValidateClicked() {
    console.log(this.certificate)
  }

  toggleDropdown() {
    this.isDropped = !this.isDropped;
    if(this.isDropped){
      this.children = this.certificate.children;
    } else {
      this.children = [];
    }
  }



}

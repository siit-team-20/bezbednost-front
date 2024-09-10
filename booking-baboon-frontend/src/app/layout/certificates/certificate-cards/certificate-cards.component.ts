import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { CertificateService } from '../services/certificate.service';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-cards',
  templateUrl: './certificate-cards.component.html',
  styleUrls: ['./certificate-cards.component.css']
})
export class CertificateCardsComponent {

  @Input() public certificates!: Certificate[];
  @Output() certificateSelected: EventEmitter<Certificate> = new EventEmitter<Certificate>();



  constructor(private certificateService: CertificateService, private authService: AuthService) {

  }
  ngOnInit(): void {
  }
  onCertificateSelected(certificate: Certificate) {
    this.certificateSelected.emit(certificate);
  }
}

import { Component, Input } from '@angular/core';
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

  constructor(private certificateService: CertificateService, private authService: AuthService) {

  }
  ngOnInit(): void {
  }
}

import { Component, Input } from '@angular/core';
import { Certificate } from '../models/certificate';

@Component({
  selector: 'app-certificate-card',
  templateUrl: './certificate-card.component.html',
  styleUrls: ['./certificate-card.component.css']
})
export class CertificateCardComponent {
  
  @Input()
  certificate!: Certificate;

}

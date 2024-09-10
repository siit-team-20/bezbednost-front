import { Component, Input } from '@angular/core';
import { CertificateRequest } from '../models/certificate-request';
import { CertificateRequestService } from '../services/certificate-request.service';

@Component({
  selector: 'app-certificate-request-cards',
  templateUrl: './certificate-request-cards.component.html',
  styleUrls: ['./certificate-request-cards.component.css']
})
export class CertificateRequestCardsComponent {

  @Input() certificateRequests!: CertificateRequest[];
  constructor(private certificateRequestService: CertificateRequestService){

  }
  ngOnInit(): void{}
}

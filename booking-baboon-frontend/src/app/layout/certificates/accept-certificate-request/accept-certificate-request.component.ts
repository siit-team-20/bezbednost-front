import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { SharedService } from 'src/app/shared/shared.service';
import { X500Name } from '../models/x500-name';
import { CertificateRequestStatus } from '../models/certificate-request-status';
import { CertificateRequestService } from '../services/certificate-request.service';
import { CreateCertificate } from '../models/create-certificate';
import { HttpErrorResponse } from '@angular/common/http';
import { CertificateRequest } from '../models/certificate-request';
import { Certificate } from '../models/certificate';
import { CertificateService } from '../services/certificate.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-accept-certificate-request',
  templateUrl: './accept-certificate-request.component.html',
  styleUrls: ['./accept-certificate-request.component.css']
})
export class AcceptCertificateRequestComponent implements OnInit {

  aliases: string[] | undefined;
  rootCertificate!: Certificate;
  certificates!: Certificate[];

  protected alias: string | null = null;

  protected aliasForm: FormGroup<{
    alias: FormControl<string | null>,
  }> = new FormGroup<{
    alias: FormControl<string | null>,
  }>({
    alias: new FormControl<string | null>(this.alias, [Validators.required])
  });

  certificate = {
    type: '',
    alias: '',
    subject: '',
    domain: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: { id: number, subject: X500Name, aliases: string[] },
              private certificateRequestService: CertificateRequestService, private sharedService: SharedService,
              private fb: FormBuilder, private certificateService: CertificateService,
              public dialogRef: MatDialogRef<AcceptCertificateRequestComponent>) {
    this.aliases = this.data.aliases;
  }
  ngOnInit(): void {
    this.loadCerts();
    this.getAliases(this.certificates);
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

  protected getAliases(certificateTree: Certificate[] | undefined): void {
    certificateTree?.forEach((certificate: Certificate): void => {
      if (certificate.children.length === 0)
        this.aliases?.push(certificate.issuer.email + "|" + certificate.serialNumber);

      this.getAliases(certificate.children);
    });
  }

  protected getRequiredErrorMessage(): string {
    return 'This field is required.';
  }

  acceptRequest(): void {
    if (!this.aliasForm.valid)
      return;

    const certificate: CreateCertificate = {
      certificateType: 'DigitalSigning',
      alias: this.alias ?? '',
      subject: this.data.subject,
      domain: null,
    }

    this.certificateRequestService.approve(this.data.id, certificate).subscribe({
      next: (data: CertificateRequest) => {
        if (data.status === CertificateRequestStatus.APPROVED) {
          this.sharedService.openSnack("Certificate request has been approved successfully");
        }
      },
      error: (error: HttpErrorResponse): void => {
        if (error)
          this.sharedService.openSnack(error.error.message);
        else
          this.sharedService.openSnack('Error reaching the server.');
      },
    });
  }

  closeDialog(): void {
    this.closeDialog();
  }

}

import {Component, Input, OnInit} from '@angular/core';
import {Host} from "../../models/host.model";
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";
import {ActivatedRoute} from "@angular/router";
import {HostService} from "../../services/host.service";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Certificate } from 'src/app/layout/certificates/models/certificate';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-host-profile-page',
  templateUrl: './host-profile-page.component.html',
  styleUrls: ['./host-profile-page.component.css']
})
export class HostProfilePageComponent implements OnInit{
  host!: Host;

  @Input()
  issuerAlias !: string;

  certificateForm !: FormGroup;

  constructor(private route: ActivatedRoute, private hostService: HostService, private fb: FormBuilder) {
  }
  ngOnInit(){

    this.certificateForm = this.fb.group({
      issuerAlias: [{ value: this.issuerAlias, disabled: true }, Validators.required],
      alias: ['', Validators.required],
      startDate: ['', [Validators.required, this.dateInFutureValidator.bind(this)]],
      endDate: ['', [Validators.required, this.dateInFutureValidator.bind(this)]],
      subject: this.fb.group({
        commonName: ['', Validators.required],
        surname: ['', Validators.required],
        givenName: ['', Validators.required],
        organization: ['', Validators.required],
        organizationalUnit: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userId: ['', Validators.required]
      })
    });



    this.route.params.subscribe((params) => {
      const id = +params['hostId'];

      this.hostService.getProfile(id).subscribe({
        next: (data: Host) => {
          this.host = data;
        },
        error: (_) => { console.log("Error!"); }
      });
    });
  }


  onSubmitClick() {
    if (this.certificateForm.valid) {
      const certificate: Certificate = this.certificateForm.value;
      console.log('Submitted certificate:', certificate);
    }
  }

  dateInFutureValidator(control: AbstractControl): ValidationErrors | null {
    const cellDate = control.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (cellDate < currentDate) {
      return { invalidDate: true, message: 'Date should be in the future' };
    }

    return null;
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (cellDate < currentDate) {
        return 'disabled-date-class';
      }
    }
    return '';
  };



}

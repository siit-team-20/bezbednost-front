import {Component, Input} from '@angular/core';
import {Accommodation} from "../../../accommodations/shared/models/accommodation.model";
import {AvailablePeriod} from "../../../accommodations/shared/models/available-period.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccommodationService} from "../../../accommodations/shared/services/accommodation.service";
import {AuthService} from "../../../../infrastructure/auth/auth.service";
import {ReservationService} from "../../../reservations/reservation.service";
import {SharedService} from "../../../../shared/shared.service";
import {Reservation} from "../../../reservations/models/reservation.model";
import {ReservationStatus} from "../../../reservations/models/reservation-status.enum";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {SummaryService} from "../../summary.service";
import {PeriodSummary} from "../../models/PeriodSummary";

@Component({
  selector: 'app-summary-generator',
  templateUrl: './summary-generator.component.html',
  styleUrls: ['./summary-generator.component.css']
})
export class SummaryGeneratorComponent {
  isPeriodSummaryShowing: boolean = false;
  periodSummary!: PeriodSummary;
  constructor(private fb: FormBuilder,
              private summaryService: SummaryService,
              private authService: AuthService) {}

  generatorForm!: FormGroup;
  price: string = '0';

  onSubmitClick() {
    if (this.generatorForm.valid) {
      const startDate = this.getDateISOString(this.generatorForm.get('startDate')?.value);
      const endDate = this.getDateISOString(this.generatorForm.get('endDate')?.value);
      const hostId = this.authService.getId();

      console.log(this.generatorForm);

      if(hostId && startDate && endDate){
        this.summaryService.getPeriodSummary(hostId,startDate, endDate).subscribe({
          next:(data: PeriodSummary)=>{
            this.periodSummary = data;
            console.log(data);
            this.isPeriodSummaryShowing = true;
          }
        });
      }
    }
  }


  ngOnInit(): void {
    this.generatorForm = this.fb.group({
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
      }
    );
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  onClosePeriodSummary() {
    this.isPeriodSummaryShowing = false;
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {AvailablePeriod} from "../../accommodations/shared/models/available-period.model";
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";
import {Reservation} from "../models/reservation.model";
import {ReservationStatus} from "../models/reservation-status.enum";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {ReservationService} from "../reservation.service";
import {SharedService} from "../../../shared/shared.service";
import {ReservationRequest} from "../models/reservation-request.model";

@Component({
  selector: 'app-reservation-request',
  templateUrl: './reservation-request.component.html',
  styleUrls: ['./reservation-request.component.css']
})
export class ReservationRequestComponent implements OnInit {
  @Input() accommodation!: Accommodation;
  availablePeriods: AvailablePeriod[] = [];

  constructor(private fb: FormBuilder, private accommodationService: AccommodationService, private authService: AuthService, private reservationService: ReservationService, private sharedService: SharedService) {}

  requestForm!: FormGroup;
  price: string = '0';

  onSubmitClick() {
    if (this.requestForm.valid) {
      const checkin = this.getDateISOString(this.requestForm.get('checkin')?.value);
      const checkout = this.getDateISOString(this.requestForm.get('checkout')?.value);

      const reservationRequest: ReservationRequest = {
        accommodation: this.accommodation,
        timeSlot: {
          startDate: checkin,
          endDate: checkout
        },
        guest: {
          id: this.authService.getId()
        },
        price: +this.price
      };

      this.reservationService.create(reservationRequest).subscribe({
        next: (reservation: Reservation) => {
          if(reservation != null){
            this.sharedService.openSnack("Reservation request has been created successfully");
          }
        }
      })

    }
  }

  calculatePrice() {
    const accommodationId = this.accommodation.id;
    const checkin = this.getDateISOString(this.requestForm.get('checkin')?.value);
    const checkout = this.getDateISOString(this.requestForm.get('checkout')?.value);
    const guestNum = this.requestForm.get('guestNum')?.value || 0;

    if (accommodationId && checkin && checkout) {
      this.accommodationService.calculateTotalPrice(accommodationId, checkin, checkout).subscribe({
        next: (totalPrice: number) => {
          if (totalPrice !== 0 && guestNum !== 0) {
            this.price = (guestNum * totalPrice).toString();
          } else {
            this.price = "0";
          }
        },
        error: (_) => {
          console.log("Error!");
        }
      });
    }
  }

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      accommodation: [{ value: this.accommodation.name, disabled: true }, Validators.required],
      checkin: ['', [Validators.required, this.dateWithinAvailablePeriodValidator.bind(this)]],
      checkout: ['', [Validators.required, this.dateWithinAvailablePeriodValidator.bind(this)]],
      guestNum: ['', Validators.required, this.minGuestNumberValidator.bind(this)],
    });

    this.requestForm.valueChanges.subscribe(() => {
      this.calculatePrice();
    });

    this.availablePeriods = this.accommodation.availablePeriods || [];
  }

  private getDateISOString(date: Date | null | undefined): string | undefined {
    return date ? date.toISOString().split('T')[0] : undefined;
  }

  minGuestNumberValidator(control: AbstractControl): Promise<ValidationErrors | null> {
    const value = control.value;

    return Promise.resolve(value >= 1 ? null : { 'minGuestNumber': true, 'message': 'Guest number must be greater than or equal to 1' });
  }

  dateWithinAvailablePeriodValidator(control: AbstractControl): ValidationErrors | null {
    const cellDate = control.value;
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (cellDate < currentDate) {
      return { 'invalidDate': true, 'message': 'Date should be in the future' };
    }

    const isDateInAvailablePeriod = this.availablePeriods.some((period: AvailablePeriod) => {
      const startTime = period.timeSlot?.startDate ? new Date(period.timeSlot.startDate) : null;
      const endTime = period.timeSlot?.endDate ? new Date(period.timeSlot.endDate) : null;

      if (startTime && endTime) {
        startTime.setHours(0, 0, 0, 0);
        endTime.setHours(0, 0, 0, 0);
      }

      return startTime && endTime && cellDate >= startTime && cellDate <= endTime;
    });

    return isDateInAvailablePeriod ? null : { 'invalidDate': true, 'message': 'Date should be within available period' };
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      if (cellDate < currentDate) {
        return 'disabled-date-class';
      }

      const isDateInAvailablePeriod = this.availablePeriods.some((period: AvailablePeriod) => {
        const startTime = period.timeSlot?.startDate ? new Date(period.timeSlot.startDate) : null;
        const endTime = period.timeSlot?.endDate ? new Date(period.timeSlot.endDate) : null;

        if (startTime && endTime) {
          startTime.setHours(0, 0, 0, 0);
          endTime.setHours(0, 0, 0, 0);
        }

        return startTime && endTime && cellDate >= startTime && cellDate <= endTime;
      });

      return isDateInAvailablePeriod ? '' : 'disabled-date-class';
    }

    return '';
  };

}

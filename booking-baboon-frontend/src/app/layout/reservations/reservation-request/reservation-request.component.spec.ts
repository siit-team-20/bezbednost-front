import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';

import { ReservationRequestComponent } from './reservation-request.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Accommodation} from "../../accommodations/shared/models/accommodation.model";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MaterialModule} from "../../../infrastructure/material/material.module";
import {SharedModule} from "../../../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {AccommodationService} from "../../accommodations/shared/services/accommodation.service";
import {of} from "rxjs";
import {NgZone} from "@angular/core";
import {AvailablePeriod} from "../../accommodations/shared/models/available-period.model";

describe('ReservationRequestComponent', () => {
  let component: ReservationRequestComponent;
  let fixture: ComponentFixture<ReservationRequestComponent>;
  let mockAccommodationService: jasmine.SpyObj<AccommodationService>;

  const mockAccommodation: Accommodation = {
    id: 1,
    name: 'Test Accommodation',
    availablePeriods: [
      {
        id: 1,
        timeSlot: {
          startDate: '2024-02-15',
          endDate: '2024-02-20'
        }
      },
      {
        id: 2,
        timeSlot: {
          startDate: '2024-02-01',
          endDate: '2024-02-10'
        }
      },
    ]
  };

  const mockedPrice = 100;

  beforeEach(waitForAsync(() => {
    const mockAccommodationService = jasmine.createSpyObj<AccommodationService> (['calculateTotalPrice']);
    mockAccommodationService.calculateTotalPrice.and.returnValue(of(mockedPrice));

    TestBed.configureTestingModule({
      declarations: [ReservationRequestComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MaterialModule,
        SharedModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AccommodationService, useValue: mockAccommodationService }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRequestComponent);
    component = fixture.componentInstance;
    component.accommodation = mockAccommodation;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.requestForm.valid).toBeFalsy();
    expect(component.requestForm.get('accommodation')?.value).toEqual(mockAccommodation.name);
    expect(component.requestForm.get('checkin')?.value).toEqual("");
    expect(component.requestForm.get('checkout')?.value).toEqual("");
    expect(component.requestForm.get('guestNum')?.value).toEqual("");
    expect(component.price).toEqual("0");
  });

  it('should update the form controls and price when user inputs are provided', fakeAsync(() => {
    const accommodationName = mockAccommodation.name;
    const checkinDate = new Date('2024-02-17');
    const checkoutDate = new Date('2024-02-19');
    const guestNum = 2;

    component.requestForm.patchValue({
      accommodation: accommodationName,
      checkin: checkinDate,
      checkout: checkoutDate,
      guestNum: guestNum,
    });

    fixture.detectChanges();
    tick();

    expect(component.requestForm.valid).toBeTruthy();
    expect(component.requestForm.get('accommodation')?.value).toEqual(accommodationName);
    expect(component.requestForm.get('checkin')?.value).toEqual(checkinDate);
    expect(component.requestForm.get('checkout')?.value).toEqual(checkoutDate);
    expect(component.requestForm.get('guestNum')?.value).toEqual(guestNum);
    expect(component.price).toEqual((guestNum * mockedPrice).toString());
  }));


  it('should disable submit button when form is invalid', fakeAsync(() => {
    const submitButton = fixture.nativeElement.querySelector('#send-request-button');

    expect(submitButton.disabled).toBeTruthy();

    const accommodationName = mockAccommodation.name;
    const checkinDate = new Date('2024-02-17');
    const checkoutDate = new Date('2024-02-19');
    const guestNum = 0;

    component.requestForm.patchValue({
      accommodation: accommodationName,
      checkin: checkinDate,
      checkout: checkoutDate,
      guestNum: guestNum,
    });

    fixture.detectChanges();
    tick();

    expect(component.requestForm.valid).toBeFalsy();
    expect(submitButton.disabled).toBeTruthy();
  }));

  it('should mark checkin control as invalid when checkin date is earlier than current date', () => {
    const checkinControl = component.requestForm.get('checkin');
    const pastDate = new Date('2022-01-01');
    checkinControl?.setValue(pastDate);

    fixture.detectChanges();

    expect(checkinControl?.hasError('invalidDate')).toBeTruthy();
    expect(checkinControl?.getError('message')).toEqual('Date should be in the future');
  });

  it('should mark checkout control as invalid when checkout date is earlier than current date', () => {
    const checkoutControl = component.requestForm.get('checkout');
    const pastDate = new Date('2022-01-01');
    checkoutControl?.setValue(pastDate);

    fixture.detectChanges();

    expect(checkoutControl?.hasError('invalidDate')).toBeTruthy();
    expect(checkoutControl?.getError('message')).toEqual('Date should be in the future');
  });

  it('should mark checkin control as invalid when checkin date is outside available period', () => {
    const checkinControl = component.requestForm.get('checkin');
    const invalidDate = new Date('2024-01-30');
    checkinControl?.setValue(invalidDate);

    fixture.detectChanges();

    expect(checkinControl?.hasError('invalidDate')).toBeTruthy();
    expect(checkinControl?.getError('message')).toEqual('Date should be within available period');
  });

  it('should mark checkout control as invalid when checkout date is outside available period', () => {
    const checkoutControl = component.requestForm.get('checkout');
    const invalidDate = new Date('2024-03-02');
    checkoutControl?.setValue(invalidDate);

    fixture.detectChanges();

    expect(checkoutControl?.hasError('invalidDate')).toBeTruthy();
    expect(checkoutControl?.getError('message')).toEqual('Date should be within available period');
  });

  it('should mark guestNum control as invalid when guestNum is less than 1', fakeAsync(() => {
    const guestNumControl = component.requestForm.get('guestNum');

    guestNumControl?.setValue(0);

    fixture.detectChanges();
    tick();

    expect(guestNumControl?.hasError('minGuestNumber')).toBeTruthy();
    expect(guestNumControl?.getError('message')).toEqual('Guest number must be greater than or equal to 1');
  }));

});

import {TestBed} from '@angular/core/testing';

import {ReservationService} from './reservation.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ReservationStatus} from "./models/reservation-status.enum";
import {Reservation} from "./models/reservation.model";
import {
  mockReservationRequest1,
  mockReservation1,
  mockReservation2,
  mockReservation3,
  mockReservationArray, mockCancellationCount5
} from "./mocks/reservation.service.mock";
import {environment} from "../../env/env";

describe('ReservationService', () => {
  let service: ReservationService;
  let httpController: HttpTestingController;

  let url = environment.apiHost;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should call getAll and return a list of reservations from the API', () => {

    service.getAll().subscribe((data) => {
      expect(data).toEqual(mockReservationArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}reservations`,
    });

    req.flush(mockReservationArray);
  });


  it('should call getReservation and return a single reservation from the API', () => {
    const id = 1;

    service.getReservation(id).subscribe((data) => {
      expect(data).toEqual(mockReservation1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}reservations/1`,
    });

    req.flush(mockReservation1);
  });

  it('should call create and return the created reservation from the API', () => {
    const createdReservation: Reservation = {
      id: 1,
      accommodation: {
        id: 1
      },
      timeSlot: {
        startDate: '2024-04-15',
        endDate: '2024-04-20'
      },
      guest: {
        id: 5
      },
      status: ReservationStatus.Pending,
      price: 200
    };

    service.create(mockReservationRequest1).subscribe((data) => {
      expect(data).toEqual(createdReservation);
    });


    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}reservations`,
    });

    req.flush(createdReservation);
  });

  it('should call getAllForGuest and return a list of reservations for the guest from the API', () => {
    const id = 5;

    service.getAllForGuest(id).subscribe((data) => {
      expect(data).toEqual(mockReservationArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}reservations/guest/5`,
    });

    req.flush(mockReservationArray);
  });

  it('should call getAllForHost and return a list of reservations for the host from the API', () => {
    const id = 1;

    service.getAllForHost(id).subscribe((data) => {
      expect(data).toEqual(mockReservationArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}reservations/host/1`,
    });

    req.flush(mockReservationArray);
  });

  it('should call getCancellationCount and return the cancellation count from the API', () => {
    const id = 5;

    service.getCancellationCount(id).subscribe((data) => {
      expect(data).toEqual(mockCancellationCount5);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}reservations/cancellation-count/5`,
    });

    req.flush(mockCancellationCount5);
  });

  it('should call approve and return the approved reservation from the API', () => {
    const approvedReservation: Reservation = {
      id: 1,
      accommodation: {
        id: 1
      },
      timeSlot: {
        startDate: '2024-04-15',
        endDate: '2024-04-20'
      },
      guest: {
        id: 5
      },
      status: ReservationStatus.Approved,
      price: 200
    };

    service.approve(1).subscribe((data) => {
      expect(data).toEqual(approvedReservation);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}reservations/1/approve`,
    });

    req.flush(approvedReservation);
  });

  it('should call deny and return the denied reservation from the API', () => {
    const deniedReservation: Reservation = {
      id: 1,
      accommodation: {
        id: 1
      },
      timeSlot: {
        startDate: '2024-04-15',
        endDate: '2024-04-20'
      },
      guest: {
        id: 5
      },
      status: ReservationStatus.Denied,
      price: 200
    };

    service.deny(1).subscribe((data) => {
      expect(data).toEqual(deniedReservation);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}reservations/1/deny`,
    });

    req.flush(deniedReservation);
  });

  it('should call cancel and return the canceled reservation from the API', () => {
    const cancelledReservation: Reservation = {
      id: 1,
      accommodation: {
        id: 1
      },
      timeSlot: {
        startDate: '2024-04-15',
        endDate: '2024-04-20'
      },
      guest: {
        id: 5
      },
      status: ReservationStatus.Canceled,
      price: 200
    };

    service.cancel(1).subscribe((data) => {
      expect(data).toEqual(cancelledReservation);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}reservations/1/cancel`,
    });

    req.flush(cancelledReservation);
  });
});

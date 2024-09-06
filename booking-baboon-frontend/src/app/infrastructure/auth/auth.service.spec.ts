import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../env/env";
import {mockReservation1} from "../../layout/reservations/mocks/reservation.service.mock";
import {mockGuest, mockHost} from "./auth.service.mock";

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  let url = environment.apiHost;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call registerGuest and return the registered Guest', () => {

    service.registerGuest(mockGuest).subscribe((data) => {
      expect(data).toEqual(mockGuest);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}guests/`,
    });

    req.flush(mockGuest);
  });

  it('should call registerHost and return the registered Host', () => {

    service.registerHost(mockHost).subscribe((data) => {
      expect(data).toEqual(mockHost);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}hosts/`,
    });

    req.flush(mockHost);
  });
});

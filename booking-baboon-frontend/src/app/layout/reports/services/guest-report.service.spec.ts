import { TestBed } from '@angular/core/testing';

import { GuestReportService } from './guest-report.service';

describe('GuestReportService', () => {
  let service: GuestReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HostReportService } from './host-report.service';

describe('HostReportService', () => {
  let service: HostReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

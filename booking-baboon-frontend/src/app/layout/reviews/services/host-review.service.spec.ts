import { TestBed } from '@angular/core/testing';

import { HostReviewService } from './host-review.service';

describe('HostReviewService', () => {
  let service: HostReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

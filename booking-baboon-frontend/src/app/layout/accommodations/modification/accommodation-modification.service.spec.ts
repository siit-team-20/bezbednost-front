import { TestBed } from '@angular/core/testing';

import { AccommodationModificationService } from './accommodation-modification.service';

describe('AccommodationModificationServiceService', () => {
  let service: AccommodationModificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationModificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

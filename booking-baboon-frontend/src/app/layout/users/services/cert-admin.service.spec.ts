import { TestBed } from '@angular/core/testing';

import { CertAdminService } from './cert-admin.service';

describe('CertAdminService', () => {
  let service: CertAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

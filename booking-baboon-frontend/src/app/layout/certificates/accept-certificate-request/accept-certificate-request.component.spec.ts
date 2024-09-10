import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptCertificateRequestComponent } from './accept-certificate-request.component';

describe('AcceptCertificateRequestComponent', () => {
  let component: AcceptCertificateRequestComponent;
  let fixture: ComponentFixture<AcceptCertificateRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptCertificateRequestComponent]
    });
    fixture = TestBed.createComponent(AcceptCertificateRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

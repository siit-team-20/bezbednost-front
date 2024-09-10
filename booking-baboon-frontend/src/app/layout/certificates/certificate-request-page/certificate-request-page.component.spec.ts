import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateRequestPageComponent } from './certificate-request-page.component';

describe('CertificateRequestPageComponent', () => {
  let component: CertificateRequestPageComponent;
  let fixture: ComponentFixture<CertificateRequestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateRequestPageComponent]
    });
    fixture = TestBed.createComponent(CertificateRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

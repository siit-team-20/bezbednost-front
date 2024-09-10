import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateRequestCardsComponent } from './certificate-request-cards.component';

describe('CertificateRequestCardsComponent', () => {
  let component: CertificateRequestCardsComponent;
  let fixture: ComponentFixture<CertificateRequestCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateRequestCardsComponent]
    });
    fixture = TestBed.createComponent(CertificateRequestCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

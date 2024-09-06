import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateCardsComponent } from './certificate-cards.component';

describe('CertificateCardsComponent', () => {
  let component: CertificateCardsComponent;
  let fixture: ComponentFixture<CertificateCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateCardsComponent]
    });
    fixture = TestBed.createComponent(CertificateCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

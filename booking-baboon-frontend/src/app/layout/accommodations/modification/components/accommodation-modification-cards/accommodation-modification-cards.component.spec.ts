import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationModificationCardsComponent } from './accommodation-modification-cards.component';

describe('ApproveChangeCardsComponent', () => {
  let component: AccommodationModificationCardsComponent;
  let fixture: ComponentFixture<AccommodationModificationCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationModificationCardsComponent]
    });
    fixture = TestBed.createComponent(AccommodationModificationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

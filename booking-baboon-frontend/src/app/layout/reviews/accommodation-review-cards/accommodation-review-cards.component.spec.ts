import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewCardsComponent } from './accommodation-review-cards.component';

describe('AccommodationReviewCardsComponent', () => {
  let component: AccommodationReviewCardsComponent;
  let fixture: ComponentFixture<AccommodationReviewCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReviewCardsComponent]
    });
    fixture = TestBed.createComponent(AccommodationReviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

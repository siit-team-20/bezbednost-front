import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewFormComponent } from './accommodation-review-form.component';

describe('AccommodationReviewFormComponent', () => {
  let component: AccommodationReviewFormComponent;
  let fixture: ComponentFixture<AccommodationReviewFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReviewFormComponent]
    });
    fixture = TestBed.createComponent(AccommodationReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

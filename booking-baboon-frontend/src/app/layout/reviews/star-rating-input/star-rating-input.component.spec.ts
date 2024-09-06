import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarRatingInputComponent } from './star-rating-input.component';

describe('StarRatingInputComponent', () => {
  let component: StarRatingInputComponent;
  let fixture: ComponentFixture<StarRatingInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StarRatingInputComponent]
    });
    fixture = TestBed.createComponent(StarRatingInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

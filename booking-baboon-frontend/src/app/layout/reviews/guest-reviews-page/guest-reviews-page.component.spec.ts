import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReviewsPageComponent } from './guest-reviews-page.component';

describe('GuestReviewsPageComponent', () => {
  let component: GuestReviewsPageComponent;
  let fixture: ComponentFixture<GuestReviewsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestReviewsPageComponent]
    });
    fixture = TestBed.createComponent(GuestReviewsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

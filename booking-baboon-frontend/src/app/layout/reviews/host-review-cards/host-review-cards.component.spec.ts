import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewCardsComponent } from './host-review-cards.component';

describe('HostReviewCardsComponent', () => {
  let component: HostReviewCardsComponent;
  let fixture: ComponentFixture<HostReviewCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReviewCardsComponent]
    });
    fixture = TestBed.createComponent(HostReviewCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

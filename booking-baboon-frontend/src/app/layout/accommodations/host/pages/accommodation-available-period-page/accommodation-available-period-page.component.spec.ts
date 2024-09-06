import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAvailablePeriodPageComponent } from './accommodation-available-period-page.component';

describe('AccommodationAvailablePeriodPageComponent', () => {
  let component: AccommodationAvailablePeriodPageComponent;
  let fixture: ComponentFixture<AccommodationAvailablePeriodPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationAvailablePeriodPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationAvailablePeriodPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

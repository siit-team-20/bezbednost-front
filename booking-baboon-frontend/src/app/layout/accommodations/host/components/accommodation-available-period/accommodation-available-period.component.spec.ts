import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationAvailablePeriodComponent } from './accommodation-available-period.component';

describe('AccommodationAvailablePeriodComponent', () => {
  let component: AccommodationAvailablePeriodComponent;
  let fixture: ComponentFixture<AccommodationAvailablePeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationAvailablePeriodComponent]
    });
    fixture = TestBed.createComponent(AccommodationAvailablePeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

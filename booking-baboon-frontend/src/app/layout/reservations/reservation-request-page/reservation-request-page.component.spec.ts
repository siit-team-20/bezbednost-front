import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRequestPageComponent } from './reservation-request-page.component';

describe('ReservationRequestPageComponent', () => {
  let component: ReservationRequestPageComponent;
  let fixture: ComponentFixture<ReservationRequestPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationRequestPageComponent]
    });
    fixture = TestBed.createComponent(ReservationRequestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

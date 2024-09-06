import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReservationsPageComponent } from './host-reservations-page.component';

describe('HostReservationsPageComponent', () => {
  let component: HostReservationsPageComponent;
  let fixture: ComponentFixture<HostReservationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReservationsPageComponent]
    });
    fixture = TestBed.createComponent(HostReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

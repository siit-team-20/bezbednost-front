import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarGuestComponent } from './navbar-guest.component';

describe('NavbarGuestComponent', () => {
  let component: NavbarGuestComponent;
  let fixture: ComponentFixture<NavbarGuestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarGuestComponent]
    });
    fixture = TestBed.createComponent(NavbarGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

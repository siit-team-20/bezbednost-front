import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUnauthorizedComponent } from './navbar-unauthorized.component';

describe('NavbarUnauthorizedComponent', () => {
  let component: NavbarUnauthorizedComponent;
  let fixture: ComponentFixture<NavbarUnauthorizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarUnauthorizedComponent]
    });
    fixture = TestBed.createComponent(NavbarUnauthorizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

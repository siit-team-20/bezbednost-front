import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCertAdminComponent } from './navbar-cert-admin.component';

describe('NavbarCertAdminComponent', () => {
  let component: NavbarCertAdminComponent;
  let fixture: ComponentFixture<NavbarCertAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarCertAdminComponent]
    });
    fixture = TestBed.createComponent(NavbarCertAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

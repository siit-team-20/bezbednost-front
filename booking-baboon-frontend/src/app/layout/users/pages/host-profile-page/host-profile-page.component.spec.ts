import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostProfilePageComponent } from './host-profile-page.component';

describe('HostProfilePageComponent', () => {
  let component: HostProfilePageComponent;
  let fixture: ComponentFixture<HostProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostProfilePageComponent]
    });
    fixture = TestBed.createComponent(HostProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

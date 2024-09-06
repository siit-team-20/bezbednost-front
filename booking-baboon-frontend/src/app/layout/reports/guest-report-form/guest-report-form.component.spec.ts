import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestReportFormComponent } from './guest-report-form.component';

describe('GuestReportFormComponent', () => {
  let component: GuestReportFormComponent;
  let fixture: ComponentFixture<GuestReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestReportFormComponent]
    });
    fixture = TestBed.createComponent(GuestReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

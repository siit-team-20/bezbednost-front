import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReportFormComponent } from './host-report-form.component';

describe('HostReportFormComponent', () => {
  let component: HostReportFormComponent;
  let fixture: ComponentFixture<HostReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReportFormComponent]
    });
    fixture = TestBed.createComponent(HostReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

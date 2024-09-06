import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReportFormComponent } from './review-report-form.component';

describe('ReviewReportFormComponent', () => {
  let component: ReviewReportFormComponent;
  let fixture: ComponentFixture<ReviewReportFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewReportFormComponent]
    });
    fixture = TestBed.createComponent(ReviewReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

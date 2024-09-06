import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewReportsComponent } from './admin-review-reports.component';

describe('AdminReviewReportsComponent', () => {
  let component: AdminReviewReportsComponent;
  let fixture: ComponentFixture<AdminReviewReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewReportsComponent]
    });
    fixture = TestBed.createComponent(AdminReviewReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

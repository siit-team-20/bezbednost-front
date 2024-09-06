import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReviewReportsPageComponent } from './admin-review-reports-page.component';

describe('AdminReviewReportsPageComponent', () => {
  let component: AdminReviewReportsPageComponent;
  let fixture: ComponentFixture<AdminReviewReportsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminReviewReportsPageComponent]
    });
    fixture = TestBed.createComponent(AdminReviewReportsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

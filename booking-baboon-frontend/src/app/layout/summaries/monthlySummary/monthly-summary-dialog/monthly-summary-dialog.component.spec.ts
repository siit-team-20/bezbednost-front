import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySummaryDialogComponent } from './monthly-summary-dialog.component';

describe('MonthlySummaryDialogComponent', () => {
  let component: MonthlySummaryDialogComponent;
  let fixture: ComponentFixture<MonthlySummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlySummaryDialogComponent]
    });
    fixture = TestBed.createComponent(MonthlySummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

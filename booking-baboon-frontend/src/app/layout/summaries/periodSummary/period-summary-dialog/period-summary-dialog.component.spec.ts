import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodSummaryDialogComponent } from './period-summary-dialog.component';

describe('PeriodSummaryDialogComponent', () => {
  let component: PeriodSummaryDialogComponent;
  let fixture: ComponentFixture<PeriodSummaryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeriodSummaryDialogComponent]
    });
    fixture = TestBed.createComponent(PeriodSummaryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

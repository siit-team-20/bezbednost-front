import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGeneratorComponent } from './summary-generator.component';

describe('SummaryGeneratorComponent', () => {
  let component: SummaryGeneratorComponent;
  let fixture: ComponentFixture<SummaryGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryGeneratorComponent]
    });
    fixture = TestBed.createComponent(SummaryGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

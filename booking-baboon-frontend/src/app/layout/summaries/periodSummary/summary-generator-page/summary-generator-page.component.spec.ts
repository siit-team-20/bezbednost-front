import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryGeneratorPageComponent } from './summary-generator-page.component';

describe('SummaryGeneratorPageComponent', () => {
  let component: SummaryGeneratorPageComponent;
  let fixture: ComponentFixture<SummaryGeneratorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryGeneratorPageComponent]
    });
    fixture = TestBed.createComponent(SummaryGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

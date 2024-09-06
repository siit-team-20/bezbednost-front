import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsPageComponent } from './accommodations-page.component';

describe('AccommodationsPageComponent', () => {
  let component: AccommodationsPageComponent;
  let fixture: ComponentFixture<AccommodationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationsPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

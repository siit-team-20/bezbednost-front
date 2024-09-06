import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationFilterComponent } from './accommodation-filter.component';

describe('AccommodationFilterComponent', () => {
  let component: AccommodationFilterComponent;
  let fixture: ComponentFixture<AccommodationFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationFilterComponent]
    });
    fixture = TestBed.createComponent(AccommodationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

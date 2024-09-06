import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationsSearchBarComponent } from './accommodations-search-bar.component';

describe('AccommodationsSearchBarComponent', () => {
  let component: AccommodationsSearchBarComponent;
  let fixture: ComponentFixture<AccommodationsSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationsSearchBarComponent]
    });
    fixture = TestBed.createComponent(AccommodationsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

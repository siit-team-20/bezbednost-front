import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationModificationDetailsComponent } from './accommodation-modification-details.component';

describe('AccommodationModificationDetailsComponent', () => {
  let component: AccommodationModificationDetailsComponent;
  let fixture: ComponentFixture<AccommodationModificationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationModificationDetailsComponent]
    });
    fixture = TestBed.createComponent(AccommodationModificationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

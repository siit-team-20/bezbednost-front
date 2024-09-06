import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationModificationDetailsPageComponent } from './accommodation-modification-details-page.component';

describe('AccommodationModificationDetailsPageComponent', () => {
  let component: AccommodationModificationDetailsPageComponent;
  let fixture: ComponentFixture<AccommodationModificationDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationModificationDetailsPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationModificationDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

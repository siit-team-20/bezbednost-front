import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationPageComponent } from './accommodation-creation-page.component';

describe('AccommodationCreationPageComponent', () => {
  let component: AccommodationCreationPageComponent;
  let fixture: ComponentFixture<AccommodationCreationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreationPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

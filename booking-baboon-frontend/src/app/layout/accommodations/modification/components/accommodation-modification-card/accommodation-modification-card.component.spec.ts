import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationModificationCardComponent } from './accommodation-modification-card.component';

describe('ApproveChangeCardComponent', () => {
  let component: AccommodationModificationCardComponent;
  let fixture: ComponentFixture<AccommodationModificationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationModificationCardComponent]
    });
    fixture = TestBed.createComponent(AccommodationModificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

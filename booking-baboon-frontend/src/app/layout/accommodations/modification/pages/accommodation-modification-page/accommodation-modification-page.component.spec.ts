import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationModificationPageComponent } from './accommodation-modification-page.component';

describe('ApproveChangePageComponent', () => {
  let component: AccommodationModificationPageComponent;
  let fixture: ComponentFixture<AccommodationModificationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationModificationPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationModificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

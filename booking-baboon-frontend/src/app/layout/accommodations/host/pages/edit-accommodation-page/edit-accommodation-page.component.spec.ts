import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodationPageComponent } from './edit-accommodation-page.component';

describe('EditAccommodationPageComponent', () => {
  let component: EditAccommodationPageComponent;
  let fixture: ComponentFixture<EditAccommodationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAccommodationPageComponent]
    });
    fixture = TestBed.createComponent(EditAccommodationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationCardComponent } from './host-accommodation-card.component';

describe('HostAccommodationCardComponent', () => {
  let component: HostAccommodationCardComponent;
  let fixture: ComponentFixture<HostAccommodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAccommodationCardComponent]
    });
    fixture = TestBed.createComponent(HostAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationCardsComponent } from './host-accommodation-cards.component';

describe('HostAccommodationCardsComponent', () => {
  let component: HostAccommodationCardsComponent;
  let fixture: ComponentFixture<HostAccommodationCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAccommodationCardsComponent]
    });
    fixture = TestBed.createComponent(HostAccommodationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

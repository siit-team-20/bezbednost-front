import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostAccommodationsListComponent } from './host-accommodations-list.component';

describe('HostAccommodationsListComponent', () => {
  let component: HostAccommodationsListComponent;
  let fixture: ComponentFixture<HostAccommodationsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostAccommodationsListComponent]
    });
    fixture = TestBed.createComponent(HostAccommodationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

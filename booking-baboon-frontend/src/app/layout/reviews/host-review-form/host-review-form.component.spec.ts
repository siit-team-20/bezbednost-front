import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewFormComponent } from './host-review-form.component';

describe('HostReviewFormComponent', () => {
  let component: HostReviewFormComponent;
  let fixture: ComponentFixture<HostReviewFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostReviewFormComponent]
    });
    fixture = TestBed.createComponent(HostReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

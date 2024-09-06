import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CetrificatePageComponent } from './cetrificate-page.component';

describe('CetrificatePageComponent', () => {
  let component: CetrificatePageComponent;
  let fixture: ComponentFixture<CetrificatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CetrificatePageComponent]
    });
    fixture = TestBed.createComponent(CetrificatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

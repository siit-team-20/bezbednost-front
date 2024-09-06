import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCardsComponent } from './notification-cards.component';

describe('NotificationCardsComponent', () => {
  let component: NotificationCardsComponent;
  let fixture: ComponentFixture<NotificationCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationCardsComponent]
    });
    fixture = TestBed.createComponent(NotificationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InboxNotificationsPage } from './inbox-notifications.page';

describe('InboxNotificationsPage', () => {
  let component: InboxNotificationsPage;
  let fixture: ComponentFixture<InboxNotificationsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxNotificationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOrGuestPage } from './login-or-guest.page';

describe('LoginOrGuestPage', () => {
  let component: LoginOrGuestPage;
  let fixture: ComponentFixture<LoginOrGuestPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginOrGuestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportAdminPage } from './sport-admin.page';

describe('SportAdminPage', () => {
  let component: SportAdminPage;
  let fixture: ComponentFixture<SportAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

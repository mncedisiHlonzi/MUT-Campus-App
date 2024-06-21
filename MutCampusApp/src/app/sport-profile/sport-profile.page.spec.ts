import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportProfilePage } from './sport-profile.page';

describe('SportProfilePage', () => {
  let component: SportProfilePage;
  let fixture: ComponentFixture<SportProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

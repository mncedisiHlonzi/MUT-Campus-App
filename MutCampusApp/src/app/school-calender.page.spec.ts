import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolCalenderPage } from './school-calender.page';

describe('SchoolCalenderPage', () => {
  let component: SchoolCalenderPage;
  let fixture: ComponentFixture<SchoolCalenderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCalenderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

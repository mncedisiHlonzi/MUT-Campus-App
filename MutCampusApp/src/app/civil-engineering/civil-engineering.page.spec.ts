import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CivilEngineeringPage } from './civil-engineering.page';

describe('CivilEngineeringPage', () => {
  let component: CivilEngineeringPage;
  let fixture: ComponentFixture<CivilEngineeringPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CivilEngineeringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MechanicalEngineeringPage } from './mechanical-engineering.page';

describe('MechanicalEngineeringPage', () => {
  let component: MechanicalEngineeringPage;
  let fixture: ComponentFixture<MechanicalEngineeringPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MechanicalEngineeringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

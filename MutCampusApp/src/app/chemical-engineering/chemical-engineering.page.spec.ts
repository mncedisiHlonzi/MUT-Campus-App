import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChemicalEngineeringPage } from './chemical-engineering.page';

describe('ChemicalEngineeringPage', () => {
  let component: ChemicalEngineeringPage;
  let fixture: ComponentFixture<ChemicalEngineeringPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChemicalEngineeringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

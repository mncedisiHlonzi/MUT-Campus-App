import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElectricalEngineeringPage } from './electrical-engineering.page';

describe('ElectricalEngineeringPage', () => {
  let component: ElectricalEngineeringPage;
  let fixture: ComponentFixture<ElectricalEngineeringPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectricalEngineeringPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

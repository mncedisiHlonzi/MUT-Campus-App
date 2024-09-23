import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DirectionsPage } from './directions.page';

describe('DirectionsPage', () => {
  let component: DirectionsPage;
  let fixture: ComponentFixture<DirectionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

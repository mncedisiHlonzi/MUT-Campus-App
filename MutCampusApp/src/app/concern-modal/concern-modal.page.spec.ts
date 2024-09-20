import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConcernModalPage } from './concern-modal.page';

describe('ConcernModalPage', () => {
  let component: ConcernModalPage;
  let fixture: ComponentFixture<ConcernModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomTablePage } from './custom-table.page';

describe('CustomTablePage', () => {
  let component: CustomTablePage;
  let fixture: ComponentFixture<CustomTablePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacultiesPage } from './faculties.page';

describe('FacultiesPage', () => {
  let component: FacultiesPage;
  let fixture: ComponentFixture<FacultiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

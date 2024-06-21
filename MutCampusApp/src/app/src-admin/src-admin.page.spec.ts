import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrcAdminPage } from './src-admin.page';

describe('SrcAdminPage', () => {
  let component: SrcAdminPage;
  let fixture: ComponentFixture<SrcAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

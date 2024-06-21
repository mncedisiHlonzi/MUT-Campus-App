import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrcProfilePage } from './src-profile.page';

describe('SrcProfilePage', () => {
  let component: SrcProfilePage;
  let fixture: ComponentFixture<SrcProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

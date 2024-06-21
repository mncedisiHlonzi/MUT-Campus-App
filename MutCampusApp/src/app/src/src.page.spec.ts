import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrcPage } from './src.page';

describe('SrcPage', () => {
  let component: SrcPage;
  let fixture: ComponentFixture<SrcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

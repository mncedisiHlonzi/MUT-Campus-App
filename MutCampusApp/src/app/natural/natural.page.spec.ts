import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NaturalPage } from './natural.page';

describe('NaturalPage', () => {
  let component: NaturalPage;
  let fixture: ComponentFixture<NaturalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NaturalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

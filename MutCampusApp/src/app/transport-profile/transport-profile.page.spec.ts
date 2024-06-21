import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportProfilePage } from './transport-profile.page';

describe('TransportProfilePage', () => {
  let component: TransportProfilePage;
  let fixture: ComponentFixture<TransportProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportAdmninPage } from './transport-admnin.page';

describe('TransportAdmninPage', () => {
  let component: TransportAdmninPage;
  let fixture: ComponentFixture<TransportAdmninPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportAdmninPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

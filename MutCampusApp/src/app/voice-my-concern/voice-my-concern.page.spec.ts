import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VoiceMyConcernPage } from './voice-my-concern.page';

describe('VoiceMyConcernPage', () => {
  let component: VoiceMyConcernPage;
  let fixture: ComponentFixture<VoiceMyConcernPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceMyConcernPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

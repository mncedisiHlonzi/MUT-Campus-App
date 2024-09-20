import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentMessagesModalPage } from './student-messages-modal.page';

describe('StudentMessagesModalPage', () => {
  let component: StudentMessagesModalPage;
  let fixture: ComponentFixture<StudentMessagesModalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMessagesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

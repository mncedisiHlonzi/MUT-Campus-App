import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportCreatePostsPage } from './sport-create-posts.page';

describe('SportCreatePostsPage', () => {
  let component: SportCreatePostsPage;
  let fixture: ComponentFixture<SportCreatePostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportCreatePostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

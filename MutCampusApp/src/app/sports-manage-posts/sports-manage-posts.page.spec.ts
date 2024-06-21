import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SportsManagePostsPage } from './sports-manage-posts.page';

describe('SportsManagePostsPage', () => {
  let component: SportsManagePostsPage;
  let fixture: ComponentFixture<SportsManagePostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsManagePostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

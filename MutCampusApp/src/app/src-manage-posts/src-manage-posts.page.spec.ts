import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrcManagePostsPage } from './src-manage-posts.page';

describe('SrcManagePostsPage', () => {
  let component: SrcManagePostsPage;
  let fixture: ComponentFixture<SrcManagePostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcManagePostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

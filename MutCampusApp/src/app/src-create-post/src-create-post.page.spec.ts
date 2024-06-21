import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SrcCreatePostPage } from './src-create-post.page';

describe('SrcCreatePostPage', () => {
  let component: SrcCreatePostPage;
  let fixture: ComponentFixture<SrcCreatePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SrcCreatePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

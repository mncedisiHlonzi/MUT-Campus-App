import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportManagePostsPage } from './transport-manage-posts.page';

describe('TransportManagePostsPage', () => {
  let component: TransportManagePostsPage;
  let fixture: ComponentFixture<TransportManagePostsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportManagePostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

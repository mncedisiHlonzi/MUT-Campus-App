import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransportCreatePostPage } from './transport-create-post.page';

describe('TransportCreatePostPage', () => {
  let component: TransportCreatePostPage;
  let fixture: ComponentFixture<TransportCreatePostPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCreatePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

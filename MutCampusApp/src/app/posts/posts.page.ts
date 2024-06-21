// posts.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

  posts: any[] = [];
  comments: any[] = [];
  newComment: string = '';
  selectedPostId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get<any[]>('http://192.168.101.153:3000/posts').subscribe(
      data => {
        this.posts = data;
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }

  likePost(postId: number) {
    this.http.post(`http://192.168.101.153:3000/posts/${postId}/like`, {}).subscribe(
      () => {
        const post = this.posts.find(p => p.postId === postId);
        if (post) {
          post.likes += 1;
        }
      },
      error => {
        console.error('Error liking post:', error);
      }
    );
  }

  openComments(postId: number) {
    this.selectedPostId = postId;
    this.http.get<any[]>(`http://192.168.101.153:3000/posts/${postId}/comments`).subscribe(
      data => {
        this.comments = data;
      },
      error => {
        console.error('Error loading comments:', error);
      }
    );
  }

  sendComment() {
    if (this.selectedPostId) {
      this.http.post(`http://192.168.101.153:3000/posts/${this.selectedPostId}/comments`, { comment: this.newComment }).subscribe(
        () => {
          this.comments.push({ comment: this.newComment, created_at: new Date() });
          this.newComment = '';
        },
        error => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }

}

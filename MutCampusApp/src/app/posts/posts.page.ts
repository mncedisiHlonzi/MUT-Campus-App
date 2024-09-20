import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ModalController, ToastController } from '@ionic/angular'; // Import ToastController
import { CommentsModalPage } from '../comments-modal/comments-modal.page'; // Import the comments modal page

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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private modalController: ModalController,
    private toastController: ToastController // Inject ToastController
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>('http://172.16.21.22:3000/posts', {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      data => {
        // Ensure the posts have the hasLiked property
        this.posts = data.map(post => ({
          ...post,
          hasLiked: this.checkIfLiked(post.postId)
        }));
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }

  checkIfLiked(postId: number): boolean {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    return likedPosts.includes(postId);
  }

  updateLikedPosts(postId: number, hasLiked: boolean) {
    let likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    if (hasLiked) {
      likedPosts.push(postId);
    } else {
      likedPosts = likedPosts.filter((id: number) => id !== postId);
    }
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
  }

  async likePost(postId: number) {
    const student = this.authService.getStudent();

    // Check if the user is a guest
    if (student.email === 'guest@mut.ac.za' && student.password === 'guestpassword') {
      const toast = await this.toastController.create({
        message: "Guests cannot like posts. Please log in to like posts.",
        duration: 3000,
        //color: 'warning',
        position: 'bottom'
      });
      await toast.present();
      return; // Stop the function if it's a guest
    }

    const token = localStorage.getItem('token');
    this.http.post(`http://172.16.21.22:3000/posts/${postId}/like`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      () => {
        const post = this.posts.find(p => p.postId === postId);
        if (post) {
          if (post.hasLiked) {
            post.likes -= 1;
            post.hasLiked = false;
          } else {
            post.likes += 1;
            post.hasLiked = true;
          }
          this.updateLikedPosts(postId, post.hasLiked);
        }
      },
      error => {
        console.error('Error toggling like:', error);
      }
    );
  }

  async openComments(postId: number) {
    this.selectedPostId = postId;
    const modal = await this.modalController.create({
      component: CommentsModalPage, // The modal component
      componentProps: { postId: this.selectedPostId }
    });

    return await modal.present();
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.loadPosts();
      event.target.complete();
    }, 2000);
  }
}

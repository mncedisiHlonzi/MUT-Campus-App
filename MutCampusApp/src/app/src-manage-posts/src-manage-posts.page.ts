import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { ModalController, ToastController } from '@ionic/angular'; // Import ToastController
import { CommentsModalPage } from '../comments-modal/comments-modal.page'; // Import the comments modal page


@Component({
  selector: 'app-src-manage-posts',
  templateUrl: './src-manage-posts.page.html',
  styleUrls: ['./src-manage-posts.page.scss'],
})
export class SrcManagePostsPage implements OnInit {

  posts: any[] = [];
  comments: any[] = [];
  newComment: string = '';
  selectedPostId: number | null = null;
  adminProfile: any = {}; // Store the admin profile

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private modalController: ModalController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadPosts();
    this.getAdminProfile(1);
  }

  loadPosts() {
    this.http.get<any[]>('http://172.16.21.22:3000/posts').subscribe(
      data => {
        console.log('Fetched posts:', data);  // Add this line for debugging
        this.posts = data.filter(post => post.adminId === 1);  // Filter by adminId
      },
      error => {
        console.error('Error loading posts:', error);
      }
    );
  }

  likePost(postId: number) {
    this.http.post(`http://172.16.21.22:3000/posts/${postId}/like`, {}).subscribe(
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

  getAdminProfile(adminId: number) {
    this.http.get(`http://172.16.21.22:3000/admin-profile/${adminId}`).subscribe(
      (response: any) => {
        this.adminProfile = response;
      },
      error => {
        console.error('Error fetching admin profile:', error);
      }
    );
  }

  async openComments(postId: number) {
    const modal = await this.modalController.create({
      component: CommentsModalPage,
      componentProps: {
        postId: postId,
        adminProfile: this.adminProfile // Pass the admin profile to the modal
      }
    });

    return await modal.present();
  }


  async deletePost(postId: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.http.delete(`http://172.16.21.22:3000/posts/${postId}`).subscribe(
              async () => {
                // Remove the post from the frontend list
                this.posts = this.posts.filter(post => post.postId !== postId);

                // Show toast message
                const toast = await this.toastController.create({
                  message: 'Post successfully deleted',
                  duration: 2000, // Duration in milliseconds
                  position: 'bottom' // Toast position
                });
                toast.present();
              },
              error => {
                console.error('Error deleting post:', error);
                // Handle error display or logging as needed
              }
            );
          },
        },
      ],
    });

    await alert.present();
  }
}

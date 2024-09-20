import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-comments-modal',
  templateUrl: './comments-modal.page.html',
  styleUrls: ['./comments-modal.page.scss'],
})
export class CommentsModalPage implements OnInit {
  @Input() postId?: number;
  @Input() adminProfile?: any; // Receive the admin profile

  comments: any[] = [];
  newComment: string = '';

  constructor(
    private http: HttpClient, 
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.postId) {
      this.loadComments();
    }
  }

  loadComments() {
    this.http.get<any[]>(`http://172.16.21.22:3000/posts/${this.postId}/comments`).subscribe(
      data => {
        this.comments = data.map(comment => ({
          commentId: comment.commentId,
          comment: comment.comment,
          created_at: new Date(comment.created_at),
          name: comment.studentName || comment.adminOffice, // Admin's office or student name
          surname: comment.studentSurname || '', // Admin has empty surname
          profile_picture: comment.studentProfilePicture || comment.adminProfilePicture // Appropriate profile picture
        }));
      },
      error => {
        console.error('Error loading comments:', error);
      }
    );
  }

  async sendComment() {
    if (!this.postId) {
      return;
    }

    const student = JSON.parse(localStorage.getItem('student') || '{}');
    const token = localStorage.getItem('token');

    // Check if the user is a guest
    if (student.email === 'guest@mut.ac.za' && student.password === 'guestpassword') {
      const toast = await this.toastController.create({
        message: "Guests cannot comment. Please log in to comment.",
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();
      return; // Stop the function if it's a guest
    }

    const commentPayload: any = { comment: this.newComment };

    if (this.adminProfile) {
      // Include admin profile if available
      commentPayload.adminProfile = this.adminProfile;
    }

    this.http.post(`http://172.16.21.22:3000/posts/${this.postId}/comments`, commentPayload, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(
      () => {
        if (this.adminProfile) {
          // If adminProfile is passed, use it
          this.comments.push({
            comment: this.newComment,
            created_at: new Date(),
            name: this.adminProfile.office, // Admin's office as name
            surname: '', // Empty surname for admins
            profile_picture: this.adminProfile.profile_picture // Admin's profile picture
          });
        } else {
          // Fallback for students
          this.comments.push({
            comment: this.newComment,
            created_at: new Date(),
            name: student.name,
            surname: student.surname,
            profile_picture: student.profile_picture
          });
        }

        this.newComment = ''; // Clear the input field after submitting
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }
}

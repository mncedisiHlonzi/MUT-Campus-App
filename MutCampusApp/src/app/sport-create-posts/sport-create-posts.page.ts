import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sport-create-posts',
  templateUrl: './sport-create-posts.page.html',
  styleUrls: ['./sport-create-posts.page.scss'],
})
export class SportCreatePostsPage implements OnInit {
  announcementText: string = '';
  targetAudience: string = '';
  selectedFile: File | null = null;

  adminProfile: any = {};

  constructor(private http: HttpClient, private toastController: ToastController) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  onSubmit() {
    if (!this.announcementText.trim() && !this.selectedFile) {
      alert('Please provide either a text or an image.');
      return;
    }

    const formData = new FormData();
    formData.append('announcementText', this.announcementText);
    formData.append('targetAudience', this.targetAudience);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('adminId', this.adminProfile.adminId); // Add adminId to form data

    this.http.post('http://172.16.21.22:3000/upload', formData).subscribe(
      response => {
        console.log('Post created!', response);
        this.presentToast('Post successfully created!'); // Show toast
        this.resetForm();
      },
      error => {
        console.error('Error creating post:', error);
        this.presentToast('Error creating post'); // Show error toast
      }
    );
  }

  resetForm() {
    this.announcementText = '';
    this.targetAudience = '';
    this.selectedFile = null;
  }

  ngOnInit() {
    this.getAdminProfile(3);
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
}

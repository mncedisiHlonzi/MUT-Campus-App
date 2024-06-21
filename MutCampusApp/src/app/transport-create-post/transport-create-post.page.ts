import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transport-create-post',
  templateUrl: './transport-create-post.page.html',
  styleUrls: ['./transport-create-post.page.scss'],
})
export class TransportCreatePostPage implements OnInit {
  announcementText: string = '';
  targetAudience: string = '';
  selectedFile: File | null = null;

  adminProfile: any = {};

  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (!this.announcementText.trim() || !this.selectedFile || !this.targetAudience) {
      alert('Please fill all the fields and select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('announcementText', this.announcementText);
    formData.append('targetAudience', this.targetAudience);
    formData.append('image', this.selectedFile);
    formData.append('adminId', this.adminProfile.adminId); // Add adminId to form data

    this.http.post('http://192.168.101.153:3000/upload', formData).subscribe(
      response => {
        console.log('Post created!', response);
        this.resetForm();
      },
      error => {
        console.error('Error creating post:', error);
      }
    );
  }

  resetForm() {
    this.announcementText = '';
    this.targetAudience = '';
    this.selectedFile = null;
  }

  ngOnInit() {
    this.getAdminProfile(2);
  }

  getAdminProfile(adminId: number) {
    this.http.get(`http://192.168.101.153:3000/admin-profile/${adminId}`).subscribe(
      (response: any) => {
        this.adminProfile = response;
      },
      error => {
        console.error('Error fetching admin profile:', error);
      }
    );
  }
}

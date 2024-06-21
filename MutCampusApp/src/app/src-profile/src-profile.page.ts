import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-src-profile',
  templateUrl: './src-profile.page.html',
  styleUrls: ['./src-profile.page.scss'],
})
export class SrcProfilePage implements OnInit {
  adminProfile: any = {}; // Declare adminProfile property

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdminProfile(1); // Fetching admin profile with adminId = 1 for example
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

  updateProfile(event: Event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', this.adminProfile.name);
    formData.append('position', this.adminProfile.position);
    formData.append('office', this.adminProfile.office);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      formData.append('profile_picture', fileInput.files[0]);
    }

    this.http.post(`http://192.168.101.153:3000/admin-profile/1`, formData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.getAdminProfile(1); // Refresh the profile data
      },
      error => {
        console.error('Error updating profile:', error);
      }
    );
  }
}

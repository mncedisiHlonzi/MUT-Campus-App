import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-transport-profile',
  templateUrl: './transport-profile.page.html',
  styleUrls: ['./transport-profile.page.scss'],
})
export class TransportProfilePage implements OnInit {

  adminProfile: any = {}; // Declare adminProfile property

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.getAdminProfile(2); // Fetching admin profile with adminId = 2 for example
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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
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

    this.http.post(`http://172.16.21.22:3000/admin-profile/2`, formData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.getAdminProfile(2); // Refresh the profile data
        this.presentToast('Profile updated successfully');
      },
      error => {
        console.error('Error updating profile:', error);
      }
    );
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAdminProfile(2);
      event.target.complete();
    }, 2000);
  }

}

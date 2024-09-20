import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-src-profile',
  templateUrl: './src-profile.page.html',
  styleUrls: ['./src-profile.page.scss'],
})
export class SrcProfilePage implements OnInit {
  adminProfile: any = {}; // Declare adminProfile property

  constructor(private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.getAdminProfile(1); // Fetching admin profile with adminId = 1 for example
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

    this.http.post(`http://172.16.21.22:3000/admin-profile/1`, formData).subscribe(
      response => {
        console.log('Profile updated successfully', response);
        this.getAdminProfile(1); // Refresh the profile data
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
      this.getAdminProfile(1);
      event.target.complete();
    }, 2000);
  }

  async openCamera() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
  
      // Check if image.dataUrl is defined
      if (image.dataUrl) {
        const response = await fetch(image.dataUrl);
        const blob = await response.blob();
        const file = new File([blob], 'profile_picture.jpg', { type: blob.type });
  
        const formData = new FormData();
        formData.append('profile_picture', file);
        formData.append('name', this.adminProfile.name);
        formData.append('position', this.adminProfile.position);
        formData.append('office', this.adminProfile.office);
  
        this.http.post(`http://172.16.21.22:3000/admin-profile/1`, formData).subscribe(
          async (response: any) => {
            console.log('Profile updated successfully', response);
            await this.getAdminProfile(1); // Refresh the profile data
            this.presentToast('Profile updated successfully');
          },
          error => {
            console.error('Error updating profile:', error);
            this.presentToast('Error updating profile');
          }
        );
      } else {
        console.error('No image data URL returned');
        this.presentToast('No image data URL returned');
      }
    } catch (error) {
      console.error('Error opening camera:', error);
      this.presentToast('Error opening camera');
    }
  }
  
  
}
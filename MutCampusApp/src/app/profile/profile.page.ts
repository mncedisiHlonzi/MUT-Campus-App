import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  student: any;
  selectedFile: File | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private toastController: ToastController) {}

  ngOnInit() {
    this.loadStudentInfo();
  }

  loadStudentInfo() {
    const student = localStorage.getItem('student');
    if (student) {
      this.student = JSON.parse(student);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  updateProfilePicture() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profile_picture', this.selectedFile);

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.post(`http://172.16.21.22:3000/students/${this.student.studentId}/profile-picture`, formData, { headers })
        .subscribe(
          (response: any) => {
            this.student.profile_picture = response.profile_picture;
            localStorage.setItem('student', JSON.stringify(this.student));
            this.presentToast('Profile picture updated successfully');
          },
          error => {
            console.error('Error updating profile picture:', error);
          }
        );
    }
  }
}

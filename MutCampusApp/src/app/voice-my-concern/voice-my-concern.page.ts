import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { StudentMessagesModalPage } from '../student-messages-modal/student-messages-modal.page';


@Component({
  selector: 'app-voice-my-concern',
  templateUrl: './voice-my-concern.page.html',
  styleUrls: ['./voice-my-concern.page.scss'],
})
export class VoiceMyConcernPage {
  fromStudent: string = '';
  subject: string = '';
  message: string = '';
  toOffice: string = 'SRC';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    const student = this.authService.getStudent();
    if (student) {
      this.fromStudent = `${student.name} ${student.surname}`;
    } else {
      this.presentToast('Student not logged in');
    }
  }

  sendConcern() {
    const student = this.authService.getStudent();
    if (!student) {
      this.presentToast('Student not logged in');
      return;
    }

    const concernData = {
      from: this.fromStudent,
      subject: this.subject,
      message: this.message,
      to: this.toOffice,
      studentId: student.studentId // Use studentId here
    };

    this.http.post('http://172.16.21.22:3000/voice-my-concern', concernData).subscribe(response => {
      console.log('Concern sent successfully', response);
      this.presentToast('Concern sent successfully');
      this.subject = '';
      this.message = '';
    }, error => {
      console.error('Error sending concern', error);
      this.presentToast('Error sending concern');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async openMessagesModal() {
    const modal = await this.modalController.create({
      component: StudentMessagesModalPage
    });
    return await modal.present();
  }

}

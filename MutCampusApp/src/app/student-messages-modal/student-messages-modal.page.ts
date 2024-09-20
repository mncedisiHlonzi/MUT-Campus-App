import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-student-messages-modal',
  templateUrl: './student-messages-modal.page.html',
  styleUrls: ['./student-messages-modal.page.scss'],
})
export class StudentMessagesModalPage implements OnInit {
  messages: any[] = [];

  constructor(
    private http: HttpClient,
    private modalController: ModalController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchStudentMessages();
  }

  fetchStudentMessages() {
    const student = this.authService.getStudent();
    if (!student) {
      console.error('Student not logged in');
      return;
    }

    this.http.get<any[]>(`http://172.16.21.22:3000/concerns/student/${student.studentId}`)
      .subscribe(data => {
        this.messages = data;
      }, error => {
        console.error('Error fetching student messages:', error);
      });
  }

  closeModal() {
    this.modalController.dismiss();
  }
}

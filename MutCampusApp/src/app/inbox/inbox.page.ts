import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ConcernModalPage } from '../concern-modal/concern-modal.page';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  concerns: any[] = [];

  constructor(private http: HttpClient, private modalController: ModalController) {}

  ngOnInit() {
    this.fetchConcerns();
  }

  fetchConcerns() {
    this.http.get<any[]>('http://172.16.21.22:3000/concerns')
      .subscribe(data => {
        this.concerns = data;
      }, error => {
        console.error('Error fetching concerns:', error);
      });
  }

  async openConcernModal(studentId: number) {
    const modal = await this.modalController.create({
      component: ConcernModalPage,
      componentProps: {
        studentId: studentId
      }
    });
    return await modal.present();
  }
}

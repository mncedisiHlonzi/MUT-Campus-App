import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-concern-modal',
  templateUrl: './concern-modal.page.html',
  styleUrls: ['./concern-modal.page.scss'],
})
export class ConcernModalPage implements OnInit {

  @Input() studentId?: number; // Optional input

  concerns: any[] = [];
  responses: string[] = [
    'admit', 'accept', 'grant', 'allow', 'concede', 'own', 'appreciate',
    'recognize', 'realize', 'subscribe to', 'approve', 'agree', 'respect',
    'cognize', 'reject', 'deny'
  ];

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.fetchConcerns();
  }

  fetchConcerns() {
    this.http.get<any[]>(`http://172.16.21.22:3000/concerns/${this.studentId}`)
      .subscribe(data => {
        this.concerns = data; // Assign fetched concerns to array
      }, error => {
        console.error('Error fetching concerns:', error);
      });
  }

  submitResponse(concernId: number, response: string) {
    console.log('Submitting response for concernId:', concernId); // Debugging line
  
    if (typeof concernId !== 'number' || isNaN(concernId)) {
      console.error('Invalid concernId:', concernId);
      return;
    }
  
    this.http.post(`http://172.16.21.22:3000/concerns/${concernId}/respond`, { response })
      .subscribe(() => {
        // Update UI after response
        this.concerns = this.concerns.map(concern => {
          if (concern.concernId === concernId) { // Ensure correct property name
            concern.response = response;
          }
          return concern;
        });
      }, error => {
        console.error('Error submitting response:', error);
      });
  }
  
  


  closeModal() {
    this.modalController.dismiss();
  }
}

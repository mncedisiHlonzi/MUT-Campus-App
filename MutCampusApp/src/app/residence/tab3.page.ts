import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago/date-ago.pipe';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, StarRatingComponent, DateAgoPipe],
})
export class Tab3Page {

  @ViewChild('rate_modal') rateModal!: IonModal;
  reviews: any[] = [

  ];
  rating: any = {};
  isToastOpen = false;
  errorMessage!: string;

  constructor() {}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  dismiss(isRating = false) {
    let data: any = null;
    if(isRating) {
      if(this.rating?.rate == 0) {
        this.setOpen(true);
        this.errorMessage = 'Please provide rating!';
        return;
      }
      data = this.rating;
      this.rating = {};
    }
    this.rateModal.dismiss(data);
  }

  onWillDismiss(event: any) {
    console.log(event?.detail?.data);
    const data = event?.detail?.data;
    if(data) {
      let reviews: any[] = [];
      reviews.push({
        ...data, 
        user_name: 'User' + (this.reviews.length + 1),
        created_at: new Date(),
      });
      reviews = reviews.concat(this.reviews);
      this.reviews = [...reviews];
      console.log(this.reviews);
    }
  }

}

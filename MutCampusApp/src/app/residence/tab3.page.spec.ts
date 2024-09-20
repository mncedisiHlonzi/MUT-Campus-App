import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IonModal, IonicModule } from '@ionic/angular';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FormsModule } from '@angular/forms';
import { DateAgoPipe } from '../pipes/date-ago/date-ago.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, StarRatingComponent, DateAgoPipe, RouterModule],
})
export class Tab3Page {
  
  @ViewChild('rate_modal') rateModal!: IonModal;
  reviews: any[] = [];
  rating: any = {};
  isToastOpen = false;
  errorMessage!: string;
  selectedResidence: any = null;

  // Array to store residence destinations
  destinations: { name: string; coordinates: string; details: any }[] = [
    { name: 'Rads Lodge', coordinates: '-29.98748618802396, 30.91769509963952', details: { address: '23 Marigold Avenue, Isipingo Hills', rooms: '1, 2, 3 & 4 Sleeper Rooms', wifi: '24/7 Wi-Fi', security: '24hrs Security' } },
    { name: 'Unicity Res', coordinates: '-29.987458256370648,30.917697339382038', details: { address: 'Unicity Res', rooms: '2 & 3 Sleeper Rooms', wifi: '24/7 Wi-Fi', security: '24hrs Security' } },  
    { name: 'Pingo Keys', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Pingo Keys', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'} },
    { name: 'Villa Mzimba', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Villa Mzimba', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'} },
    { name: 'Ubombo House', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Ubombo House', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Shiv Mansions', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '12, 2 Ronald Ave, Montclair, Durban, 4061', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'} },
    { name: 'Pilglen Mews', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: ' Montclair, Durban, 4004', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Halima', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Halima Court, Montclair, Durban, 4061', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Ridgemont', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '306 Stephen Dlamini Rd, Musgrave, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Cross Street', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '22 Cross Street, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'} },
    { name: '537 Smith Street', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '537 Smith Street', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: '385 Smith Street', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '385 Smith Street', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Plaza Lodge', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '9 Dr Yusuf Dadoo St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Poython House', coordinates: '-29.857344992872235, 31.02422796400114',  details: { address: '320 West St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Urban Life Crystal', coordinates: '-29.8577815185789, 31.02425592708974',  details: { address: '320 West St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Colonial Building', coordinates: '-29.858161456068956, 31.023365768750487',  details: { address: '330 West St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Melody Hills', coordinates: '-29.858161456068956, 31.023365768750487',  details: { address: '162 West St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Durban House', coordinates: '-29.859330937255088, 31.030699300236375',  details: { address: '29 Cato Square, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Oasis Res', coordinates: '-29.85809746693364, 31.031315129314606',  details: { address: 'Oasis residence, 140 Anton Lembede St, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Victoria Embankment', coordinates: '-29.86083675942931, 31.03369998575983',  details: { address: '17 Victoria Embankment, Durban Central, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Sea Board', coordinates: '-29.856586681941863, 31.035977946662495',  details: { address: 'Sea Board', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Water Front', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Water Front', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Ark Royal', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Ark Royal', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Lonsdale Hotel', coordinates: '-29.85595052117105, 31.03709126404316',  details: { address: '50 West St, South Beach, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Beach Hotel', coordinates: '-29.855531902387533, 31.038720853053285',  details: { address: '107 Marine Parade, South Beach, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Craiglee', coordinates: '-29.861040205524763, 30.99628487680975',  details: { address: '207 Bulwer Rd, Glenwood, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Botanic', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '127 Botanic Gardens Rd, Musgrave, Berea, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Floradene', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Botanic Gardens Alley, Musgrave, Berea, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: '120 Clerence Rd', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '120 Clarence Rd, Essenwood, Berea, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Abelia', coordinates: '-29.987458256370648,30.917697339382038', details: { address: '69 Abelia Rd, Sydenham, Berea, 4091', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Bernard Close', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Bulwer, Berea, 4083', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Cullingworth', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Cullingworth', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Berea Court', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Berea Court', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Grand Lodge', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: '25 Hunt Rd, Bulwer, Durban, 4001', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Carmel Court', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Carmel Court', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Gale Street', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Gale Street', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}},
    { name: 'Ardomore Flat', coordinates: '-29.987458256370648,30.917697339382038',  details: { address: 'Ardomore Flat', rooms: 'Room Details', wifi: 'Wi-Fi Details', security: 'Security Details'}}
  
  ];

  constructor() {}

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  getDirections(residenceName: string): void {
    // Find the destination based on the residence name
    const residence = this.destinations.find(dest => dest.name === residenceName);
    
    if (residence) {
      const googleMapsUrl: string = `https://www.google.com/maps/dir/?api=1&destination=${residence.coordinates}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    } else {
      console.error('Residence not found');
    }
  }

  /*
  async openModal() {
    const modal = await this.modalController.create({
      component: ResidenceModalPage, // Reference to the modal component
      componentProps: {
        selectedResidence: this.selectedResidence, // Pass selectedResidence or any other data
      }
    });
    return await modal.present();
  }*/
  

  selectResidence(residenceName: string) {
    this.selectedResidence = this.destinations.find(dest => dest.name === residenceName);
  }

  /*
  visitResidence(residenceName: string): void {
    this.selectedResidence = this.residences[residenceName] || null;
  }*/

  dismiss(isRating = false) {
    let data: any = null;
    if (isRating) {
      if (this.rating?.rate == 0) {
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
    if (data) {
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
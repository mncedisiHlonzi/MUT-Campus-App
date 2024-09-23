import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.page.html',
  styleUrls: ['./directions.page.scss'],
})
export class DirectionsPage implements OnInit {

  destination = { lat: -29.9701901392812, lng: 30.914167887350107 }; // MUT Coordinates

  constructor() {}

  ngOnInit() {
    // Initialization logic if needed
  }

  // Function to open Google Maps with directions from the user's location to MUT
  openGoogleMaps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        // Construct the Google Maps URL with user's location and destination (MUT)
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${this.destination.lat},${this.destination.lng}&travelmode=driving`;

        // Redirect the user to Google Maps
        window.open(googleMapsUrl, '_blank');
      }, (error) => {
        console.error('Error fetching user location: ', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.page.html',
  styleUrls: ['./directions.page.scss'],
})
export class DirectionsPage implements OnInit {

  destination = { lat: -29.9701901392812, lng: 30.914167887350107 }; // MUT Coordinates

  constructor() {}

  ngOnInit() {}

  // Function to open Google Maps with directions
  openGoogleMaps() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = `${position.coords.latitude},${position.coords.longitude}`;
        const destinationLocation = `${this.destination.lat},${this.destination.lng}`;
        
        // Construct Google Maps directions URL
        const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation}&destination=${destinationLocation}&travelmode=driving`;

        // Open the URL in a new tab or Google Maps app
        window.open(googleMapsUrl, '_blank');
      }, (error) => {
        console.error('Error fetching user location: ', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
*/
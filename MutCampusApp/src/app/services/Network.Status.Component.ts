import { Component } from '@angular/core';
import NetworkService from './network.service.spec';

@Component({
  selector: 'app-network-status',
  template: `
    <div *ngIf="!isConnected" class="offline-card">
      <p>NO Internet CONNECTION</p>
    </div>
    
    <div *ngIf="showConnectedCard" class="online-card">
      <p>Connected</p>
    </div>
  `,
  styles: [`
    .offline-card {
      background-color: red;
      color: white;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
      margin: 20px 0;
    }

    .online-card {
      background-color: green;
      color: white;
      padding: 15px;
      text-align: center;
      border-radius: 8px;
      margin: 20px 0;
    }
  `]
})
export class NetworkStatusComponent {
  isConnected: boolean = true;  // to track online/offline status
  showConnectedCard: boolean = false;  // to control the green "Connected" card visibility

  constructor() {
    // Subscribe to the network status
    NetworkService.getNetworkStatus().subscribe((status) => {
      if (!status) {
        this.isConnected = false;  // Show red card if offline
        this.showConnectedCard = false;  // Ensure "Connected" card is not showing
      } else {
        this.isConnected = true;
        this.showTemporaryConnectedCard();  // Show green card for 3 seconds
      }
    });
  }

  // Show the "Connected" card for 3 seconds and then hide it
  showTemporaryConnectedCard() {
    this.showConnectedCard = true;
    setTimeout(() => {
      this.showConnectedCard = false;
    }, 3000);  // 3000ms = 3 seconds
  }
}


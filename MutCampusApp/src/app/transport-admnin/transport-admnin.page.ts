import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transport-admnin',
  templateUrl: './transport-admnin.page.html',
  styleUrls: ['./transport-admnin.page.scss'],
})
export class TransportAdmninPage implements OnInit {

  adminProfile: any = {}; // Define the adminProfile property

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdminProfile(2); // Fetching admin profile with adminId = 1 for example
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

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getAdminProfile(2);
      event.target.complete();
    }, 2000);
  }

}

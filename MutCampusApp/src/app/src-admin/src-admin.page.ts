import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-src-admin',
  templateUrl: './src-admin.page.html',
  styleUrls: ['./src-admin.page.scss'],
})
export class SrcAdminPage implements OnInit {

  adminProfile: any = {}; // Define the adminProfile property
  newNotificationCount: number = 0; // Define a property to hold the count of new notifications

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdminProfile(1); // Fetching admin profile with adminId = 1 for example
    this.fetchNewNotificationCount(); // Fetch the count of new notifications
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

  fetchNewNotificationCount() {
    this.http.get<any[]>('http://172.16.21.22:3000/concern-notifications').subscribe(notifications => {
      this.newNotificationCount = notifications.filter(n => !n.isRead).length;
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      this.fetchNewNotificationCount();
      this.getAdminProfile(1);
      event.target.complete();
    }, 2000);
  }
}

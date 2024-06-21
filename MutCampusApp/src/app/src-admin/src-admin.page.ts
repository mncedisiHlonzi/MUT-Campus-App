import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-src-admin',
  templateUrl: './src-admin.page.html',
  styleUrls: ['./src-admin.page.scss'],
})
export class SrcAdminPage implements OnInit {

  adminProfile: any = {}; // Define the adminProfile property

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAdminProfile(1); // Fetching admin profile with adminId = 1 for example
  }

  getAdminProfile(adminId: number) {
    this.http.get(`http://192.168.101.153:3000/admin-profile/${adminId}`).subscribe(
      (response: any) => {
        this.adminProfile = response;
      },
      error => {
        console.error('Error fetching admin profile:', error);
      }
    );
  }

}

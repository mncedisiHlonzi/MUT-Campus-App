import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inbox-notifications',
  templateUrl: './inbox-notifications.page.html',
  styleUrls: ['./inbox-notifications.page.scss'],
})
export class InboxNotificationsPage implements OnInit {
  newMessages: any[] = [];
  viewedMessages: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.http.get<any[]>('http://172.16.21.22:3000/concern-notifications').subscribe(notifications => {
      this.newMessages = notifications.filter(n => !n.isRead);
      this.viewedMessages = notifications.filter(n => n.isRead);
    });
  }

  markAsRead(notificationId: number) {
    this.http.post(`http://172.16.21.22:3000/concern-notifications/${notificationId}/read`, {}).subscribe(() => {
      this.fetchNotifications();
      this.router.navigate(['/inbox']); // Navigate to 'inbox' page
    });
  }
}

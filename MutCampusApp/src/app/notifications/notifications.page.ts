import { Component, OnInit } from '@angular/core';
import { NotificationsService } from '../notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  unreadNotifications: any[] = [];
  readNotifications: any[] = [];
  noNotifications: boolean = false;

  constructor(private notificationsService: NotificationsService, private router: Router) {}

  ngOnInit() {
    this.fetchNotifications();
  }

  getOfficeName(fromOffice: string): string {
    switch (fromOffice) {
      case '1':
        return 'SRC Office';
      case '2':
        return 'Transport Office';
      case '3':
        return 'Sport Office';
      default:
        return 'Unknown Office';
    }
  }

  fetchNotifications() {
    this.notificationsService.getNotifications().subscribe(
      (notifications) => {
        this.unreadNotifications = notifications.filter(notification => !notification.isRead);
        this.readNotifications = notifications.filter(notification => notification.isRead);
        this.noNotifications = this.unreadNotifications.length === 0 && this.readNotifications.length === 0;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  handleNotificationRead(notificationId: number) {
    this.notificationsService.markAsRead(notificationId).subscribe(
      () => {
        this.fetchNotifications();
        this.router.navigate(['/posts']);  // Navigate to the posts page
      },
      (error) => {
        console.error('Error marking notification as read:', error);
      }
    );
  }
}

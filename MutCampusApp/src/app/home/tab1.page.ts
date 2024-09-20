import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { NotificationsService } from '../notifications.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  student: any;
  unreadCount: number = 0;

  constructor(
    private notificationsService: NotificationsService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.setStatusBarColor();
    this.loadStudentInfo();
    this.fetchUnreadCount();
  }

  async setStatusBarColor() {
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  }

  loadStudentInfo() {
    const student = localStorage.getItem('student');
    if (student) {
      this.student = JSON.parse(student);
    }
  }

  fetchUnreadCount() {
    if (!this.isGuest()) { // Prevent fetching unread notifications if the user is a guest
      this.notificationsService.getUnreadCount().subscribe(
        (data) => {
          this.unreadCount = data.count;
        },
        (error) => {
          console.error('Error fetching unread count:', error);
        }
      );
    } else {
      this.unreadCount = 0; // Set count to 0 for guests
    }
  }

  isGuest() {
    // Check if the student is a guest by comparing email and password (adjust based on your system)
    return this.student?.email === 'guest@mut.ac.za' && this.student?.password === 'guestpassword';
  }

  onProfileClick() {
    if (!this.isGuest()) {
      // Navigate to the profile page if the user is a student
      this.router.navigate(['/profile']);
    }
    // Do nothing if the user is a guest (no alert needed)
  }

  async onVoiceMyConcernClick() {
    if (this.isGuest()) {
      // Show a toast message if the user is a guest
      const toast = await this.toastController.create({
        message: "Guests do not have access to this platform. Please log in to continue.",
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();
    } else {
      // Navigate to the '/voice-my-concern' page if the user is a student
      this.router.navigate(['/voice-my-concern']);
    }
  }

  async onBellClick() {
    if (this.isGuest()) {
      // Show a toast message informing guests cannot see notifications
      const toast = await this.toastController.create({
        message: 'Guests cannot see notifications. Please log in to view them.',
        duration: 3000,
        position: 'bottom'
      });
      await toast.present();
    } else {
      // Navigate to the notifications page if the user is a student
      this.router.navigate(['/notifications']);
    }
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.fetchUnreadCount();
      event.target.complete();
      this.loadStudentInfo();
    }, 2000);
  }
}

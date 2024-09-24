import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-settingss',
  templateUrl: './settingss.page.html',
  styleUrls: ['./settingss.page.scss'],
})
export class SettingssPage implements OnInit {
  darkMode: boolean = false;
  notificationsEnabled: boolean = true;
  emailNotifications: boolean = true;
  pushNotifications: boolean = true;
  locationSharing: boolean = true;
  dataCollection: boolean = true;

  // Mock user data for view-only account information
  user = {
    email: 'user@example.com',
    username: 'johndoe123',
    phoneNumber: '+1234567890'
  };

  constructor(private storage: Storage) {}

  ngOnInit() {
    // Check saved theme preference
    this.storage.get('darkMode').then((val) => {
      this.darkMode = val || false;
      this.applyDarkMode();
    });

    // Load notification, privacy settings from storage if available
    this.storage.get('notificationsEnabled').then((val) => this.notificationsEnabled = val ?? true);
    this.storage.get('emailNotifications').then((val) => this.emailNotifications = val ?? true);
    this.storage.get('pushNotifications').then((val) => this.pushNotifications = val ?? true);
    this.storage.get('locationSharing').then((val) => this.locationSharing = val ?? true);
    this.storage.get('dataCollection').then((val) => this.dataCollection = val ?? true);
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.storage.set('darkMode', this.darkMode);
    this.applyDarkMode();
  }

  applyDarkMode() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  // You can add functions to store changes for the other settings
  updateSettings(key: string, value: any) {
    this.storage.set(key, value);
  }
}

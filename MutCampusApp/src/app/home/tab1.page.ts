import { Component, ViewChild } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  ngOnInit() {
    this.setStatusBarColor();
  }

  async setStatusBarColor() {
    await StatusBar.setBackgroundColor({ color: '#ffffff' });
  }

}

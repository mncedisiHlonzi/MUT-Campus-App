import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxNotificationsPageRoutingModule } from './inbox-notifications-routing.module';

import { InboxNotificationsPage } from './inbox-notifications.page';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxNotificationsPageRoutingModule,
    SharedModule
  ],
  declarations: [InboxNotificationsPage]
})
export class InboxNotificationsPageModule {}

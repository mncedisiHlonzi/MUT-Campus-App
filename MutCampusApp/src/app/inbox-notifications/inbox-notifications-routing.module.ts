import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InboxNotificationsPage } from './inbox-notifications.page';

const routes: Routes = [
  {
    path: '',
    component: InboxNotificationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InboxNotificationsPageRoutingModule {}

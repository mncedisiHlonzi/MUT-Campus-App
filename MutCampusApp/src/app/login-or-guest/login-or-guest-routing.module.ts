import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginOrGuestPage } from './login-or-guest.page';

const routes: Routes = [
  {
    path: '',
    component: LoginOrGuestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginOrGuestPageRoutingModule {}

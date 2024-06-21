import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOrGuestPageRoutingModule } from './login-or-guest-routing.module';

import { LoginOrGuestPage } from './login-or-guest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOrGuestPageRoutingModule
  ],
  declarations: [LoginOrGuestPage]
})
export class LoginOrGuestPageModule {}

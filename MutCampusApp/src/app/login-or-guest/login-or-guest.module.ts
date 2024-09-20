import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginOrGuestPageRoutingModule } from './login-or-guest-routing.module';

import { LoginOrGuestPage } from './login-or-guest.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginOrGuestPageRoutingModule,
    HttpClientModule
  ],
  declarations: [LoginOrGuestPage]
})
export class LoginOrGuestPageModule {}
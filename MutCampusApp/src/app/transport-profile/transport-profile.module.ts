import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportProfilePageRoutingModule } from './transport-profile-routing.module';

import { TransportProfilePage } from './transport-profile.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportProfilePageRoutingModule,
    HttpClientModule
  ],
  declarations: [TransportProfilePage]
})
export class TransportProfilePageModule {}

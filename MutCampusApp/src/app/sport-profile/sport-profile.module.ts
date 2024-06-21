import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportProfilePageRoutingModule } from './sport-profile-routing.module';

import { SportProfilePage } from './sport-profile.page';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportProfilePageRoutingModule,
    HttpClientModule
  ],
  declarations: [SportProfilePage]
})
export class SportProfilePageModule {}

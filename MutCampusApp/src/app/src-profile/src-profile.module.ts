import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SrcProfilePageRoutingModule } from './src-profile-routing.module';

import { SrcProfilePage } from './src-profile.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SrcProfilePageRoutingModule,
    HttpClientModule
  ],
  declarations: [SrcProfilePage]
})
export class SrcProfilePageModule {}

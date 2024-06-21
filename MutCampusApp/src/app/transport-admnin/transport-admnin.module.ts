import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportAdmninPageRoutingModule } from './transport-admnin-routing.module';

import { TransportAdmninPage } from './transport-admnin.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportAdmninPageRoutingModule,
    HttpClientModule
  ],
  declarations: [TransportAdmninPage]
})
export class TransportAdmninPageModule {}

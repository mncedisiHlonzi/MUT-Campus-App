import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportAdminPageRoutingModule } from './sport-admin-routing.module';

import { SportAdminPage } from './sport-admin.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SportAdminPage]
})
export class SportAdminPageModule {}

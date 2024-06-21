import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SrcAdminPageRoutingModule } from './src-admin-routing.module';

import { SrcAdminPage } from './src-admin.page';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SrcAdminPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SrcAdminPage]
})
export class SrcAdminPageModule {}

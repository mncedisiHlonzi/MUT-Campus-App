import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SrcPageRoutingModule } from './src-routing.module';

import { SrcPage } from './src.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SrcPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SrcPage]
})
export class SrcPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NaturalPageRoutingModule } from './natural-routing.module';

import { NaturalPage } from './natural.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NaturalPageRoutingModule
  ],
  declarations: [NaturalPage]
})
export class NaturalPageModule {}

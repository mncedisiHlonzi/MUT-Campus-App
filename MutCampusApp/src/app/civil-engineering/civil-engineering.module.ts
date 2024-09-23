import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CivilEngineeringPageRoutingModule } from './civil-engineering-routing.module';

import { CivilEngineeringPage } from './civil-engineering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CivilEngineeringPageRoutingModule
  ],
  declarations: [CivilEngineeringPage]
})
export class CivilEngineeringPageModule {}

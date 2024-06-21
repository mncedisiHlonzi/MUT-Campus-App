import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MechanicalEngineeringPageRoutingModule } from './mechanical-engineering-routing.module';

import { MechanicalEngineeringPage } from './mechanical-engineering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MechanicalEngineeringPageRoutingModule
  ],
  declarations: [MechanicalEngineeringPage]
})
export class MechanicalEngineeringPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElectricalEngineeringPageRoutingModule } from './electrical-engineering-routing.module';

import { ElectricalEngineeringPage } from './electrical-engineering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElectricalEngineeringPageRoutingModule
  ],
  declarations: [ElectricalEngineeringPage]
})
export class ElectricalEngineeringPageModule {}

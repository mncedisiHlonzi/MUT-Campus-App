import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChemicalEngineeringPageRoutingModule } from './chemical-engineering-routing.module';

import { ChemicalEngineeringPage } from './chemical-engineering.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChemicalEngineeringPageRoutingModule
  ],
  declarations: [ChemicalEngineeringPage]
})
export class ChemicalEngineeringPageModule {}

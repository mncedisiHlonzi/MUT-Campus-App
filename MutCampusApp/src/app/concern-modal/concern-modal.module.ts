import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConcernModalPageRoutingModule } from './concern-modal-routing.module';

import { ConcernModalPage } from './concern-modal.page';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConcernModalPageRoutingModule,
    SharedModule
  ],
  declarations: [ConcernModalPage]
})
export class ConcernModalPageModule {}

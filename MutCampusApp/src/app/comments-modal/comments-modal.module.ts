import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsModalPageRoutingModule } from './comments-modal-routing.module';

import { CommentsModalPage } from './comments-modal.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsModalPageRoutingModule,
    SharedModule
  ],
  declarations: [CommentsModalPage]
})
export class CommentsModalPageModule {}

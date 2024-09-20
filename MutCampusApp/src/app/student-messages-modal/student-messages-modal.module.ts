import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudentMessagesModalPageRoutingModule } from './student-messages-modal-routing.module';

import { StudentMessagesModalPage } from './student-messages-modal.page';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentMessagesModalPageRoutingModule,
    SharedModule
  ],
  declarations: [StudentMessagesModalPage]
})
export class StudentMessagesModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolCalenderPageRoutingModule } from './school-calender-routing.module';

import { SchoolCalenderPage } from './school-calender.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolCalenderPageRoutingModule
  ],
  declarations: [SchoolCalenderPage]
})
export class SchoolCalenderPageModule {}

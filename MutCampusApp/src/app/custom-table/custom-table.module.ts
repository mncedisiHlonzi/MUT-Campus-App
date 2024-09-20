import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomTablePageRoutingModule } from './custom-table-routing.module';

import { CustomTablePage } from './custom-table.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    CustomTablePageRoutingModule
  ],
  declarations: [CustomTablePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomTablePageModule {}
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoiceMyConcernPageRoutingModule } from './voice-my-concern-routing.module';

import { VoiceMyConcernPage } from './voice-my-concern.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VoiceMyConcernPageRoutingModule
  ],
  declarations: [VoiceMyConcernPage]
})
export class VoiceMyConcernPageModule {}

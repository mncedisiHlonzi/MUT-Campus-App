import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoiceMyConcernPage } from './voice-my-concern.page';

const routes: Routes = [
  {
    path: '',
    component: VoiceMyConcernPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoiceMyConcernPageRoutingModule {}

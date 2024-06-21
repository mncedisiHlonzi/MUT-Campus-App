import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportProfilePage } from './sport-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SportProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportProfilePageRoutingModule {}

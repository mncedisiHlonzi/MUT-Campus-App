import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportProfilePage } from './transport-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TransportProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportProfilePageRoutingModule {}

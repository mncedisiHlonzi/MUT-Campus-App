import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportAdmninPage } from './transport-admnin.page';

const routes: Routes = [
  {
    path: '',
    component: TransportAdmninPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportAdmninPageRoutingModule {}

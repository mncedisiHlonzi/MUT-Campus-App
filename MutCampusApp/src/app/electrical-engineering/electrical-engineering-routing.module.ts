import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElectricalEngineeringPage } from './electrical-engineering.page';

const routes: Routes = [
  {
    path: '',
    component: ElectricalEngineeringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectricalEngineeringPageRoutingModule {}

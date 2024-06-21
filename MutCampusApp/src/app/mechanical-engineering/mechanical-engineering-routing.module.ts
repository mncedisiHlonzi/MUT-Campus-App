import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MechanicalEngineeringPage } from './mechanical-engineering.page';

const routes: Routes = [
  {
    path: '',
    component: MechanicalEngineeringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MechanicalEngineeringPageRoutingModule {}

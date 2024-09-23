import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChemicalEngineeringPage } from './chemical-engineering.page';

const routes: Routes = [
  {
    path: '',
    component: ChemicalEngineeringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChemicalEngineeringPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CivilEngineeringPage } from './civil-engineering.page';

const routes: Routes = [
  {
    path: '',
    component: CivilEngineeringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CivilEngineeringPageRoutingModule {}

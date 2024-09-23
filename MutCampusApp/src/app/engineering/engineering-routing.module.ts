import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EngineeringPage } from './engineering.page';

const routes: Routes = [
  {
    path: '',
    component: EngineeringPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EngineeringPageRoutingModule {}

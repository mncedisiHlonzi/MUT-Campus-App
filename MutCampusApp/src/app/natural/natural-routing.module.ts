import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NaturalPage } from './natural.page';

const routes: Routes = [
  {
    path: '',
    component: NaturalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NaturalPageRoutingModule {}

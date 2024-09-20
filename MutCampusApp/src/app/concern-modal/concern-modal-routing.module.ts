import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConcernModalPage } from './concern-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConcernModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConcernModalPageRoutingModule {}

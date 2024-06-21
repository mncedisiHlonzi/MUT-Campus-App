import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportAdminPage } from './sport-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SportAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportAdminPageRoutingModule {}

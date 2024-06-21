import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcAdminPage } from './src-admin.page';

const routes: Routes = [
  {
    path: '',
    component: SrcAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrcAdminPageRoutingModule {}

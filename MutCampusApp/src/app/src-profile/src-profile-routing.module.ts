import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcProfilePage } from './src-profile.page';

const routes: Routes = [
  {
    path: '',
    component: SrcProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrcProfilePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcPage } from './src.page';

const routes: Routes = [
  {
    path: '',
    component: SrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrcPageRoutingModule {}

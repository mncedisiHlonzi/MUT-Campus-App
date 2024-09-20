import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomTablePage } from './custom-table.page';

const routes: Routes = [
  {
    path: '',
    component: CustomTablePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomTablePageRoutingModule {}

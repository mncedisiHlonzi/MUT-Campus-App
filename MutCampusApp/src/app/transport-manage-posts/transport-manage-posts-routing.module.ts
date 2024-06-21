import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportManagePostsPage } from './transport-manage-posts.page';

const routes: Routes = [
  {
    path: '',
    component: TransportManagePostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportManagePostsPageRoutingModule {}

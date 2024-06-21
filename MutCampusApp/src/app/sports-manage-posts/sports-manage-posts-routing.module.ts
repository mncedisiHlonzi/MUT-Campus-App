import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportsManagePostsPage } from './sports-manage-posts.page';

const routes: Routes = [
  {
    path: '',
    component: SportsManagePostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportsManagePostsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcManagePostsPage } from './src-manage-posts.page';

const routes: Routes = [
  {
    path: '',
    component: SrcManagePostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrcManagePostsPageRoutingModule {}

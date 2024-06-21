import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportCreatePostsPage } from './sport-create-posts.page';

const routes: Routes = [
  {
    path: '',
    component: SportCreatePostsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportCreatePostsPageRoutingModule {}

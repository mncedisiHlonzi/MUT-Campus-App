import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SrcCreatePostPage } from './src-create-post.page';

const routes: Routes = [
  {
    path: '',
    component: SrcCreatePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SrcCreatePostPageRoutingModule {}

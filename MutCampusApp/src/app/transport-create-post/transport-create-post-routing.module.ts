import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportCreatePostPage } from './transport-create-post.page';

const routes: Routes = [
  {
    path: '',
    component: TransportCreatePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportCreatePostPageRoutingModule {}

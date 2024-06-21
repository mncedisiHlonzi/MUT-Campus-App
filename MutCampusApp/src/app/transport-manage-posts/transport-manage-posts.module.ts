import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportManagePostsPageRoutingModule } from './transport-manage-posts-routing.module';

import { TransportManagePostsPage } from './transport-manage-posts.page';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module'; // Import SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportManagePostsPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    TransportManagePostsPage
  ]
})
export class TransportManagePostsPageModule {}

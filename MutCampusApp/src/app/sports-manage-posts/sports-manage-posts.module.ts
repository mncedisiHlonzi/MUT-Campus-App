import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportsManagePostsPageRoutingModule } from './sports-manage-posts-routing.module';

import { SportsManagePostsPage } from './sports-manage-posts.page';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module'; // Import SharedModule

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportsManagePostsPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    SportsManagePostsPage
  ]
})
export class SportsManagePostsPageModule {}

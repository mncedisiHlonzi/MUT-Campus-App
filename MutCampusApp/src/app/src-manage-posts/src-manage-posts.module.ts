import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SrcManagePostsPageRoutingModule } from './src-manage-posts-routing.module';

import { SrcManagePostsPage } from './src-manage-posts.page';

import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SrcManagePostsPageRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    SrcManagePostsPage
  ]
})
export class SrcManagePostsPageModule {}

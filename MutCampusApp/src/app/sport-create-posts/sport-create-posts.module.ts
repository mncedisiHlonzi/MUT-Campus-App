import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportCreatePostsPageRoutingModule } from './sport-create-posts-routing.module';

import { SportCreatePostsPage } from './sport-create-posts.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportCreatePostsPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SportCreatePostsPage]
})
export class SportCreatePostsPageModule {}

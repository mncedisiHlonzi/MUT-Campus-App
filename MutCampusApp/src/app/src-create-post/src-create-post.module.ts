import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SrcCreatePostPageRoutingModule } from './src-create-post-routing.module';

import { SrcCreatePostPage } from './src-create-post.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SrcCreatePostPageRoutingModule,
    HttpClientModule
  ],
  declarations: [SrcCreatePostPage]
})
export class SrcCreatePostPageModule {}

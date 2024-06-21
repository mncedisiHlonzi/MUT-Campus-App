import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransportCreatePostPageRoutingModule } from './transport-create-post-routing.module';

import { TransportCreatePostPage } from './transport-create-post.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransportCreatePostPageRoutingModule,
    HttpClientModule
  ],
  declarations: [TransportCreatePostPage]
})
export class TransportCreatePostPageModule {}

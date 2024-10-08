import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";

import { HttpClientModule } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: "longDate" }
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite,
    Geolocation
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

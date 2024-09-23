import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolCalenderPage } from './school-calender.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolCalenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolCalenderPageRoutingModule {}

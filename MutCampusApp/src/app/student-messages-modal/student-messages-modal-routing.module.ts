import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentMessagesModalPage } from './student-messages-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StudentMessagesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentMessagesModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddShiftModalPage } from './add-shift-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AddShiftModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddShiftModalPageRoutingModule {}

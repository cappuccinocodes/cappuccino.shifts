import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateShiftModalPage } from './update-shift-modal.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateShiftModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateShiftModalPageRoutingModule {}

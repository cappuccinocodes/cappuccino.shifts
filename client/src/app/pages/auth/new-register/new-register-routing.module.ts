import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRegisterPage } from './new-register.page';

const routes: Routes = [
  {
    path: '',
    component: NewRegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRegisterPageRoutingModule {}

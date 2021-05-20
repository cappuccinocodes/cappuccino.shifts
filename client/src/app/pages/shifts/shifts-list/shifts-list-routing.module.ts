import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShiftsListPage } from './shifts-list.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftsListPageRoutingModule {}

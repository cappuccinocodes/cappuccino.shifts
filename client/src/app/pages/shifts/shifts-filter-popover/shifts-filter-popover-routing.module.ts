import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShiftsFilterPopoverPage } from './shifts-filter-popover.page';

const routes: Routes = [
  {
    path: '',
    component: ShiftsFilterPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftsFilterPopoverPageRoutingModule {}

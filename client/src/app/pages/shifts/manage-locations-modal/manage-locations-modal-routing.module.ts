import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageLocationsModalPage } from './manage-locations-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ManageLocationsModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLocationsModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageLocationsModalPageRoutingModule } from './manage-locations-modal-routing.module';

import { ManageLocationsModalPage } from './manage-locations-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageLocationsModalPageRoutingModule
  ],
  declarations: [ManageLocationsModalPage]
})
export class ManageLocationsModalPageModule {}

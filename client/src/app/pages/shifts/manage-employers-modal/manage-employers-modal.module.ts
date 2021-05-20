import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageEmployersModalPageRoutingModule } from './manage-employers-modal-routing.module';

import { ManageEmployersModalPage } from './manage-employers-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageEmployersModalPageRoutingModule
  ],
  declarations: [ManageEmployersModalPage]
})
export class ManageEmployersModalPageModule {}

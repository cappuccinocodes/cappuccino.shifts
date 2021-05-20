import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateShiftModalPageRoutingModule } from './update-shift-modal-routing.module';

import { UpdateShiftModalPage } from './update-shift-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateShiftModalPageRoutingModule
  ],
  declarations: [UpdateShiftModalPage]
})
export class UpdateShiftModalPageModule {}

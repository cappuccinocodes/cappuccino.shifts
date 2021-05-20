import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddShiftModalPageRoutingModule } from './add-shift-modal-routing.module';

import { AddShiftModalPage } from './add-shift-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddShiftModalPageRoutingModule
  ],
  declarations: [AddShiftModalPage]
})
export class AddShiftModalPageModule {}

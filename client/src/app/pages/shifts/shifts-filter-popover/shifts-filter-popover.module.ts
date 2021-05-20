import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShiftsFilterPopoverPageRoutingModule } from './shifts-filter-popover-routing.module';

import { ShiftsFilterPopoverPage } from './shifts-filter-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftsFilterPopoverPageRoutingModule
  ],
  declarations: [ShiftsFilterPopoverPage]
})
export class ShiftsFilterPopoverPageModule {}

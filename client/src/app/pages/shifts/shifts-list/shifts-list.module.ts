import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShiftsListPageRoutingModule } from './shifts-list-routing.module';

import { ShiftsListPage } from './shifts-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShiftsListPageRoutingModule
  ],
  declarations: [ShiftsListPage]
})
export class ShiftsListPageModule {}

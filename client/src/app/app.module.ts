import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage-angular';

import { AddShiftModalPageModule } from './pages/shifts/add-shift-modal/add-shift-modal.module';
import { ManageEmployersModalPageModule } from './pages/shifts/manage-employers-modal/manage-employers-modal.module';
import { ShiftsFilterPopoverPageModule } from './pages/shifts/shifts-filter-popover/shifts-filter-popover.module';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ManageLocationsModalPageModule } from './pages/shifts/manage-locations-modal/manage-locations-modal.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    IonicStorageModule.forRoot(),

    AddShiftModalPageModule,
    ManageEmployersModalPageModule,
    ManageLocationsModalPageModule,
    ShiftsFilterPopoverPageModule,

    HttpClientModule,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

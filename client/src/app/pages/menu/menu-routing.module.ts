import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'shifts-list',
        loadChildren: () => import('../shifts/shifts-list/shifts-list.module').then( m => m.ShiftsListPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../shifts/help/help.module').then( m => m.HelpPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

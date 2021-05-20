import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },

  {
    path: 'new-register',
    loadChildren: () => import('./pages/auth/new-register/new-register.module').then( m => m.NewRegisterPageModule)
  },
  {
    path: 'new-login',
    loadChildren: () => import('./pages/auth/new-login/new-login.module').then( m => m.NewLoginPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'update-shift-modal',
    loadChildren: () => import('./pages/shifts/update-shift-modal/update-shift-modal.module').then( m => m.UpdateShiftModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

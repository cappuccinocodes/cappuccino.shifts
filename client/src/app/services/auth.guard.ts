import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean
   {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/new-login']);
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit, OnDestroy {
  isAuth: boolean;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }
}

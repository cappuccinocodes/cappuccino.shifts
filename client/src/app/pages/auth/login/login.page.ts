import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user);
       console.log(this.user);
  }
}

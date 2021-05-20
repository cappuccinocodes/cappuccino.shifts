import { Component, OnInit } from '@angular/core';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  signup() {

    this.authService.registerUser(this.user);
       console.log(this.user);
  }

}

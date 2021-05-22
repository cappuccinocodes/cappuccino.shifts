import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getMaxListeners } from 'process';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.page.html',
  styleUrls: ['./new-login.page.scss'],
})
export class NewLoginPage implements OnInit, OnDestroy{
  user: FormGroup;

  authMessageSubscription: Subscription;

  authMessage = '';
  passwordError = '';
  emailError = '';

  guestEmail = 'admin@admin.com';
  guestPassword = 'admin1';

  emailErrorBoolean = false;
  passwordErrorBoolean = false;


  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  };

  ngOnInit() {
    this.authMessageSubscription = this.authService.authMessage.subscribe((message) => {
      console.log('received = ' + message.code);
      this.authMessage = message.code;
      this.showErrorCode();
    });
  }

  loginUser(fb) {
    this.authService.login(fb.value);
    console.log('user: ' + fb.value.email);
    console.log(' message string ' + this.authMessage);
  }

  guestLogin() {
    this.authService.login({email: this.guestEmail, password: this.guestPassword});
  }

  showErrorCode() {
    if (this.authMessage === 'auth/wrong-password') {
      this.emailErrorBoolean=false;
      this.passwordErrorBoolean=true;
      this.passwordError = 'Wrong Password';
    }

    if(this.authMessage === 'auth/invalid-email') {
      this.emailErrorBoolean=true;
      this.passwordErrorBoolean=false;
      this.emailError = 'Invalid e-amail';
    }

    if(this.authMessage === 'auth/user-not-found') {
      this.emailErrorBoolean=true;
      this.passwordErrorBoolean=false;
      this.emailError = 'User not found';
    }
  }

  ngOnDestroy(): void {
    this.authMessageSubscription.unsubscribe();
  }

}

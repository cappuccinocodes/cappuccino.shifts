import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  emailErrorBoolean = false;
  passwordErrorBoolean = false;


  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = this.fb.group({
      email: ['Your e-mail', [Validators.required, Validators.email]],
      password: ['Your password']
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
    console.log('user: ' + fb.value);
    console.log(' message string ' + this.authMessage);
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

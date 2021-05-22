import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, User } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-register',
  templateUrl: './new-register.page.html',
  styleUrls: ['./new-register.page.scss'],
})
export class NewRegisterPage implements OnInit {
  user: FormGroup;

  guestEmail = 'admin@admin.com';
  guestPassword = 'admin1';

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  };

  ngOnInit() {}

  registerUser(fb) {
    this.authService.registerUser(fb.value);
    console.log('email ' + fb.value.email);
  };

  guestLogin() {
    this.authService.login({email: this.guestEmail, password: this.guestPassword});
  };
}

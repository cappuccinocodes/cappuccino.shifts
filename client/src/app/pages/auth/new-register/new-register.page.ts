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

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.user = this.fb.group({
      email: ['Your e-mail', [Validators.required, Validators.email]],
      password: ['Your password']
    });
  };

  ngOnInit() {}

  registerUser(fb) {
    this.authService.registerUser(fb.value);
    console.log('email ' + fb.value.email);

  }
}

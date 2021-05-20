import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser = null;

  authChange = new Subject<boolean>();
  authMessage = new Subject<any>();
  private isAuthenticated = false;


  constructor(private router: Router, private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.authSuccessfully();
      } else {
        console.log('nah');
      }
    });
  }

  registerUser(authData: User) {
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();
    })
    .catch(error => {
      console.log(error);
    });

  }

  login(authData: User) {
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      console.log(result);
      this.authSuccessfully();

    })
    .catch(error => {
      console.log( 'error service ' + error);
      this.sendErrorMessage(error);
    });
  }

  logout() {
    this.auth.signOut();
    this.authChange.next(false);
    this.router.navigate(['/new-login']);
    this.isAuthenticated = false;
  }


  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/menu/shifts-list']);

}

private sendErrorMessage(error) {
  this.authMessage.next(error);
}
}

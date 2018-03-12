import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../services/auth.service';

import { UtilitiesService } from '../../services/utilities.service';

import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = null;

  constructor(private authService: AuthService, private router: Router, private utils: UtilitiesService) { }

  ngOnInit() {
    this.user = {
      email: '',
      password: ''
    };
  }

  signInWithTwitter() {
      this.authService.signInWithTwitter()
      .then((res) => {
          this.router.navigate(['']);
        })
      .catch((err) => console.log(err));
    }

    signInWithFacebook() {
      this.authService.signInWithFacebook()
      .then((res) => {
        const token = res.credential.accessToken;
          console.log('FB user: ' + JSON.stringify(res));
          console.log('displayName: ' + res.user.displayName);
          console.log('apiKey: ' + res.user.apiKey);

          const foo = Object.keys(res.user);
          for (const key of foo) {
            console.log('key: ' + key);
            const foo2 = Object.keys(res.user[key]);
            for (const key2 of foo2) {
              console.log('---key2: ' + key2);
            }
          }

          localStorage.username = res.user.displayName;
          localStorage.apikey = res.user.apiKey;

          // localStorage.apikey_expires = res.user.stsTokenManager.expirationTime;

          this.router.navigate(['']);
        })
      .catch((err) => console.log(err));
    }

    signInWithEmail() {
      this.authService.signInEmail(this.user.email, this.user.password)
          .then((res) => {
            console.log('res:' + res);
            this.router.navigate(['']);
          })
          .catch((err) => console.log('error: ' + err));
    }

    signInWithGoogle() {
      this.authService.signInWithGoogle();
      // .then(function(result) {
      //   // This gives you a Google Access Token. You can use it to access the Google API.
      //   const token = result.credential.accessToken;
      //   // The signed-in user info.
      //   this.user = result.user;
      //   console.log('user ' + JSON.stringify(this.user));
      //   console.log('expirationTime: ' + moment(this.user.expirationTime).format());
      //   // ...
      // }).catch(function(error) {
      //   // Handle Errors here.
      //   const errorCode = error.code;
      //   const errorMessage = error.message;
      //   // The email of the user's account used.
      //   const email = error.email;
      //   // The firebase.auth.AuthCredential type that was used.
      //   const credential = error.credential;
      //   // ...
      // });

    }

    signInWithUsername() {
      this.authService.signInUsername(this.user)
          .then((res) => {
            console.log(res);
            localStorage.apikey = res.apikey;
            // localStorage.apikey_expires = this.utils.parseJavaDate2ISO(res.apikey_expires);
            localStorage.apikey_expires = res.apikey_expires;
            localStorage.username = res.username;
            localStorage.isLoggedIn = true;
            this.router.navigate(['']);
          })
          .catch((err) => console.log('error: ' + err));
    }

}

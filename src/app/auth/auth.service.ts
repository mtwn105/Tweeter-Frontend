import { MessageConstants } from './../constants/message.constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverUrl = environment.serverUrl;

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private userService: UserService,
  ) {
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    // const user = JSON.parse(localStorage.getItem('token'));
    const user = localStorage.getItem('token');
    // return (user !== null && user.emailVerified !== false) ? true : false;
    return (user !== null) ? true : false;
  }

  // Sign up
  signUp(user) {
    this.http.post(`${this.serverUrl}/auth/register`, user).subscribe((response: any) => {
      this.snackbar.open(MessageConstants.SIGN_UP_SUCCESS, "Close", {
        duration: 2000
      })
      this.router.navigate(['login']);
    },
      (err: HttpErrorResponse) => {
        if (err.status == 400) {
          this.snackbar.open(err.error.message, "Close", {
            duration: 2000
          })
        } else {
          // TODO: Show custom errors
          this.snackbar.open(MessageConstants.SIGN_UP_ERROR, "Close", {
            duration: 2000
          })
        }
      }
    );
  }

  // Sign In
  signIn(username: string, password: string) {

    this.http.post(`${this.serverUrl}/auth/login`, {
      username,
      password
    }).subscribe({
      next: (response: any) => {
        const { token, id } = response;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        this.userService.loggedIn = true;
        this.userService.loggedInUserId = id;
        this.router.navigate(['home']);
      },
      error: (err) => {
        console.error("ERROR While sign in");
        this.snackbar.open(MessageConstants.SIGN_IN_ERROR, "Close", {
          duration: 2000
        })
      }
    });

  }

  // Sign out
  signOut() {
    // localStorage.removeItem('user');
    // this.authSe
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}

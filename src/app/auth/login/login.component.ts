import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup;
  submitted = false;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })

  }

  login() {

    this.submitted = true;
    console.log("logging in")

    if (this.loginForm.invalid) {
      return;
    }

    this.submitted = false;
    console.log("sending auth request ...")

    this.authService.signIn(this.loginForm.value.username, this.loginForm.value.password);

  }

}

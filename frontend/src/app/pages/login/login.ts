import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest } from '../../services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  login() {
    this.errorMessage = [];
    this.authService.authenticate({
      body: this.authRequest,
    })
      .then((res: any) => {
        this.router.navigate(['books']);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  register() {
    this.router.navigate(['register']);
  }
}
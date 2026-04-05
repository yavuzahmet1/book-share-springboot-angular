import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMessage: Array<string> = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) { }

  async login() {
    this.errorMessage = [];
    this.isLoading = true;

    try {
      const res = await this.authService.authenticate({ body: this.authRequest });

      this.tokenService.token = res.token as string;
      this.router.navigate(['books']);

    } catch (err: any) {
      console.error(err);

      if (err.error?.validationErrors) {
        this.errorMessage = err.error.validationErrors;
      } else {
        this.errorMessage.push(err.error?.message || 'Giriş sırasında bir hata oluştu.');
      }

    } finally {
      this.isLoading = false;
    }
  }

  register() {
    this.router.navigate(['register']);
  }
}
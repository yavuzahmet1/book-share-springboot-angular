import { Component, ChangeDetectorRef } from '@angular/core';
import { RegistirationRequest } from '../../services/models/registiration-request';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  registerRequest: RegistirationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  errorMessage: Array<string> = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private cdr: ChangeDetectorRef
  ) { }

  async register() {
    this.errorMessage = [];
    this.isLoading = true;
    try {
      await this.authService.register({ body: this.registerRequest });
      this.router.navigate(['activate-account']);

    } catch (err: any) {

      if (err.error?.validationErrors) {
        this.errorMessage = err.error.validationErrors;
      }
      else if (err.error?.businessExceptionDescription) {
        this.errorMessage = [err.error.businessExceptionDescription];
      }
      else {
        this.errorMessage.push(err.error?.error || 'An error occurred during registration');
      }
      this.cdr.detectChanges();

    } finally {
      this.isLoading = false;
    }
  }

  login() {
    this.router.navigate(['login']);
  }
}
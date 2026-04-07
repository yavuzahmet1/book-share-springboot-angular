import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  imports: [CodeInputModule],
  templateUrl: './activate-account.html',
  styleUrl: './activate-account.scss',
})
export class ActivateAccount {

  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private route: Router,
    private authService: AuthenticationService
  ) { }

  goToLogin() {
    this.route.navigate(['/login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  async confirmAccount(token: string) {
    try {
      await this.authService.confirm({ token });
      this.isOkay = true;
      this.message = "Your account has been successfully activated. You can now log in.";
    } catch (err: any) {
      this.isOkay = false;
      this.message = err.error?.error || err.error?.message || 'An error occurred during account activation.';
    } finally {
      this.submitted = true;
    }
  }
}
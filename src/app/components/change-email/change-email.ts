import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-email',
  imports: [FormsModule],
  templateUrl: './change-email.html',
  styleUrl: './change-email.css',
})
export class ChangeEmail {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];
  emailChanegSuccess: string = "";

  async changeEmail(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, newEmail, password } = form.value;
      await this.userService.changeEmail(email, newEmail, password);

      this.emailChanegSuccess = "Email change ok!"
    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        this.validationErrors = error.error.violations;
      }
      else {
        this.errorMessage = error?.error?.message ?? "Error during email change";
      }
    }
  }
}

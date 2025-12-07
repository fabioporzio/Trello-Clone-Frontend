import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];
  passwordChangeSuccess: string = "";

  async changePassword(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, currentPassword, newPassword } = form.value;
      await this.userService.changePassword(email, currentPassword, newPassword);

      this.passwordChangeSuccess = "Password change ok!"
      this.router.navigate(["/login"])
    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        this.validationErrors = error.error.violations;
      }
      else {
        this.errorMessage = error?.error?.message ?? "Error during password change";
      }
    }
  }
}

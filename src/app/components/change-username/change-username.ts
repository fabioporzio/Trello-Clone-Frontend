import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { TokenService } from '../../services/token-service/token-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-change-username',
  imports: [FormsModule],
  templateUrl: './change-username.html',
  styleUrl: './change-username.css',
})
export class ChangeUsername {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];
  usernameChangeSuccess: string = "";

  async changeUsername(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, newUsername, password } = form.value;
      await this.userService.changeUsername(email, newUsername, password);

      this.usernameChangeSuccess = "Username change ok!"
    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        this.validationErrors = error.error.violations;
      }
      else {
        this.errorMessage = error?.error?.message ?? "Error during username change";
      }
    }
  }
}

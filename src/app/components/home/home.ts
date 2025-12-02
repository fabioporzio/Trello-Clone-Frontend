import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];
  successMessage: string = "";

  user: Partial<User> = {};
  
  async ngOnInit() {
    await this.tokenService.validateTokens();

    this.user = await this.userService.getUser();
  }

  async changeEmail(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, newEmail, password } = form.value;
      await this.userService.changeEmail(email, newEmail, password);

      this.successMessage = "Email chang ok!"
    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        this.validationErrors = error.error.violations;
      }
      else {
        this.errorMessage = error?.error?.message ?? "Error during login";
      }
    }
  }
}

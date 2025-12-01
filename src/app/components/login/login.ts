import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginResponse } from '../../models/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];

  async login(form: NgForm): Promise<void> {
    try {
      const { email, password } = form.value;
      const response: LoginResponse = await this.userService.login(email, password);
      
      if (response.accessToken && response.refreshToken) {
        localStorage.setItem("access-token", response.accessToken);
        localStorage.setItem("refresh-token", response.refreshToken);
        await this.router.navigate(['/home']);
      }
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

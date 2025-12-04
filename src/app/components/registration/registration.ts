import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { CreateUserResponse } from '../../models/user';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {
  private readonly userService = inject(UserService)
  private readonly router = inject(Router)

  errorMessage: string = "";
  validationErrors: any[] = [];
  async handleForm(form: NgForm): Promise<void> {

    try {
      const { email, username, password } = form.value;
      const response: CreateUserResponse = await this.userService.register(email, username, password);

      if (response && response.email) {
        await this.router.navigate(["/"]);
      }
    }
    catch (error: any) {
      console.error(error);
      if (error?.error?.violations) {
        this.validationErrors = error?.error?.violations;
      }
      else {
        this.errorMessage = error?.error?.message ?? "Error during registration";
      }

    }
  }
}

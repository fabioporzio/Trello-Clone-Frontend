import { Component, inject } from '@angular/core';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  private readonly toastr = inject(ToastrService);

  async changePassword(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, currentPassword, newPassword } = form.value;
      await this.userService.changePassword(email, currentPassword, newPassword);

      localStorage.setItem('access-token', "");
      localStorage.setItem('refresh-token', "");

      this.toastr.success('Password change was successful', 'Success');

      await this.router.navigate(['']);
    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        error.error.violations.forEach((v: any) => {
          this.toastr.error(v.message, 'Error');
        });
      }
      else {
        this.toastr.error(error?.error?.message ?? 'Error during email change', 'Error');
      }
    }
  }
}

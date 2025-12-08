import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { TokenService } from '../../services/token-service/token-service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  private readonly toastr = inject(ToastrService);

  async changeUsername(form: NgForm): Promise<void> {
    await this.tokenService.validateTokens();

    try {
      const { email, newUsername, password } = form.value;
      await this.userService.changeUsername(email, newUsername, password);

      this.toastr.success('Username change was successful', 'Success');
      await this.router.navigate(['/home']);

    }
    catch (error: any) {
      console.error(error);

      if (error?.error?.violations) {
        error.error.violations.forEach((v: any) => {
          this.toastr.error(v.message, 'Error');
        });
      }
      else {
        this.toastr.error(error?.error?.message ?? 'Error during username change', 'Error');
      }
    }
  }
}

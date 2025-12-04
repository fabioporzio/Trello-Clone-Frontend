import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginResponse } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  isLoading: boolean = false;

  async login(form: NgForm): Promise<void> {
    this.isLoading = true;

    try {
      const { email, password } = form.value;
      const response: LoginResponse = await this.userService.login(email, password);

      if (response.accessToken && response.refreshToken) {
        localStorage.setItem('access-token', response.accessToken);
        localStorage.setItem('refresh-token', response.refreshToken);
        await this.router.navigate(['/home']);
      }

    } catch (error: any) {
      console.error(error);

      if (error?.error?.violations?.length) {
        error.error.violations.forEach((v: any) => {
          this.toastr.error(v.message, 'Errore');
        });
      } else {
        this.toastr.error(error?.error?.message ?? 'Errore durante il login', 'Errore');
      }

    } finally {
      this.isLoading = false;
    }
  }
}

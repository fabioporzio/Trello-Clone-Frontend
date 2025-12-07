import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../services/user-service';
import { Router, RouterLink } from '@angular/router';
import { CreateUserResponse } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink],
  templateUrl: './registration.html',
  styleUrls: ['./registration.css'],
})
export class Registration {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);

  isLoading: boolean = false;

  async handleForm(form: NgForm): Promise<void> {
    this.isLoading = true;

    try {
      const { email, username, password } = form.value;
      const response: CreateUserResponse = await this.userService.register(email, username, password);

      if (response && response.email) {
        this.toastr.success('Registrazione completata!', 'Successo');
        await this.router.navigate(['']);
      }

    } catch (error: any) {
      console.error(error);

      if (error?.error?.violations?.length) {
        error.error.violations.forEach((v: any) => {
          this.toastr.error(v.message, 'Errore');
        });
      } else {
        this.toastr.error(error?.error?.message ?? 'Errore durante la registrazione', 'Errore');
      }

    } finally {
      this.isLoading = false;
    }
  }
}

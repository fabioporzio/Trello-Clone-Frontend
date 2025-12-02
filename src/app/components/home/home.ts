import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project-service/project-service';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly projectService = inject(ProjectService)
  private readonly router = inject(Router);

  errorMessage: string = "";
  validationErrors: any[] = [];
  emailChanegSuccess: string = "";
  usernameChangeSuccess: string = "";
  passwordChangeSuccess: string = "";

  user: Partial<User> = {};
  projects: Project[] = [];
  ownedProjects: Project[] = [];
  starredProjects: Project[] = [];

  async ngOnInit() {
    await this.tokenService.validateTokens();

    this.user = await this.userService.getUser();

    this.projects = await this.projectService.getProjects();

    this.ownedProjects = this.projects.filter(project => {
      return project.owner === this.user.email;
    });

    this.starredProjects = this.projects.filter(project =>
      project.team.includes(this.user.email!) &&
      !this.ownedProjects.some(owned => owned.id === project.id)
    );


  }

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

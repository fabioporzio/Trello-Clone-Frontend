import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { TokenService } from '../../services/token-service/token-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly tokenService = inject(TokenService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  user: Partial<User> = {}
  async ngOnInit() {
    await this.tokenService.validateTokens();

    this.user = await this.userService.getUser();
  }
}

import { inject, Injectable } from '@angular/core';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse, UpdateUserEmailRequest, UpdateUserPasswordRequest, UpdateUserUsernameRequest, User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  getAccessToken(): string | null {
    const accessToken = localStorage.getItem("access-token");
    if (accessToken) {
      return accessToken;
    }
    else {
      return null;
    }
  }

  register(email: string, username: string, passowrd: string): Promise<CreateUserResponse> {
    const createUserRequest: CreateUserRequest = {
      email: email,
      username: username,
      password: passowrd
    };

    const url = "http://localhost:8080/api/user/register";
    return firstValueFrom(this.http.post<CreateUserResponse>(url, createUserRequest));
  }

  login(email: string, password: string): Promise<LoginResponse> {
    const loginRequest: LoginRequest = {
      email: email,
      password: password
    }

    const url = "http://localhost:8080/api/auth/login";
    return firstValueFrom(this.http.post<LoginResponse>(url, loginRequest));
  }

  getUser(): Promise<User> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/user"
    return firstValueFrom(this.http.get<User>(url, { headers }));
  }

  changeEmail(email: string, newEmail: string, passowrd: string): Promise<void> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const updateUserEmailRequest: UpdateUserEmailRequest = {
      currentEmail: email,
      newEmail: newEmail,
      password: passowrd
    };

    const url = "http://localhost:8080/api/user/update-email"
    return firstValueFrom(this.http.put<void>(url, updateUserEmailRequest, { headers }));
  }

  changeUsername(email: string, newUsername: string, passowrd: string): Promise<void> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const updateUserUsernameRequest: UpdateUserUsernameRequest = {
      email: email,
      newUsername: newUsername,
      password: passowrd
    };

    const url = "http://localhost:8080/api/user/update-username"
    return firstValueFrom(this.http.put<void>(url, updateUserUsernameRequest, { headers }));
  }

  changePassword(email: string, currentPassword: string, newPassword: string): Promise<void> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const updateUserPasswordRequest: UpdateUserPasswordRequest = {
      email: email,
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    const url = "http://localhost:8080/api/user/update-password"
    return firstValueFrom(this.http.put<void>(url, updateUserPasswordRequest, { headers }));
  }
}

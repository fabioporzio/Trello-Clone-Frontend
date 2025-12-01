import { inject, Injectable } from '@angular/core';
import { CreateUserRequest, CreateUserResponse, LoginRequest, LoginResponse } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  
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
}

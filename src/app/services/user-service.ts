import { inject, Injectable } from '@angular/core';
import { CreateUserRequest, CreateUserResponse } from '../models/user';
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
}

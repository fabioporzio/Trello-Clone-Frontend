import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router)
  
  async validateTokens() {
    if (this.isAccessTokenValid()) {
      return;
    }
    else {
      if (this.isRefreshTokenValid()) {
        this.refreshAccessToken();
        return;
      }
      else {
        await this.router.navigate(['/login']);
      }
    }
  }

  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } 
    catch (e) {
      return null;
    }
  }

  isTokenValid(token: string | null): boolean {
    if (!token) return false;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  }

  isAccessTokenValid(): boolean {
    const token = localStorage.getItem('access-token');
    return this.isTokenValid(token);
  }

  isRefreshTokenValid(): boolean {
    const token = localStorage.getItem('refresh-token');
    return this.isTokenValid(token);
  }

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refresh-token');

    const url = "http://localhost:8080/api/auth/refresh";
    const accessToken = await firstValueFrom(this.http.put<string>(url, refreshToken));
    localStorage.setItem("access-token", accessToken)
  }
}

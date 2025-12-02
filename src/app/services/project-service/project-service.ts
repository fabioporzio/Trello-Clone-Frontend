import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  
  getProjects(): Promise<Project[]> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/projects"
    return firstValueFrom(this.http.get<Project[]>(url, { headers }));
  }
}

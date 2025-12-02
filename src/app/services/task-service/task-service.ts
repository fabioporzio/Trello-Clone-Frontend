import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTaskRequest, Task } from '../../models/task';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  
  addTask(createTaskRequest: CreateTaskRequest): Promise<Task> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/task"; 
    return firstValueFrom(this.http.post<Task>(url, createTaskRequest, { headers }));
  }
}

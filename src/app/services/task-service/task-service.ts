import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateTaskRequest, TaskObject, UpdateTaskRequest } from '../../models/task';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);
  
  addTask(createTaskRequest: CreateTaskRequest): Promise<TaskObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/task"; 
    return firstValueFrom(this.http.post<TaskObject>(url, createTaskRequest, { headers }));
  }

  getTasksByProjectId(projectId: string): Promise<TaskObject[]> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/task/project/" + projectId; 
    return firstValueFrom(this.http.get<TaskObject[]>(url, { headers }));
  }

  getTaskById(taskId: string): Promise<TaskObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/task/" + taskId; 
    return firstValueFrom(this.http.get<TaskObject>(url, { headers }));
  }

  updateTaskPhase(updateTaskRequest: UpdateTaskRequest, taskId: string): Promise<TaskObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/task/" + taskId; 
    return firstValueFrom(this.http.put<TaskObject>(url, updateTaskRequest, { headers }));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/user';
import { CreateProjectRequest, ProjectObject, UpdateProjectRequest } from '../../models/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private readonly http = inject(HttpClient);
  
  getProjects(): Promise<ProjectObject[]> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project"
    return firstValueFrom(this.http.get<ProjectObject[]>(url, { headers }));
  }

  getProjectById(projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId;
    return firstValueFrom(this.http.get<ProjectObject>(url, { headers }));
  }

  createProject(projectName: string): Promise<ProjectObject> {
    const createProjectRequest: CreateProjectRequest = {
      name: projectName
    }

    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project"
    return firstValueFrom(this.http.post<ProjectObject>(url, createProjectRequest, { headers }));
  }

  updateProjectName(project: UpdateProjectRequest, projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId; 
    return firstValueFrom(this.http.put<ProjectObject>(url, project, { headers }));
  }

  addPhase(project: UpdateProjectRequest, projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId; 
    return firstValueFrom(this.http.put<ProjectObject>(url, project, { headers }));
  }

  addMember(project: UpdateProjectRequest, projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId; 
    return firstValueFrom(this.http.put<ProjectObject>(url, project, { headers }));
  }

  deleteMember(project: UpdateProjectRequest, projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId; 
    return firstValueFrom(this.http.put<ProjectObject>(url, project, { headers }));
  }
  

  deleteProject(projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/project/" + projectId; 
    return firstValueFrom(this.http.delete<ProjectObject>(url, { headers }));
  }

  loadUsers(): Promise<User[]> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/user/all"; 
    return firstValueFrom(this.http.get<User[]>(url, { headers }));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Project } from '../../components/project/project';

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

    const url = "http://localhost:8080/api/projects"
    return firstValueFrom(this.http.get<ProjectObject[]>(url, { headers }));
  }

  getProjectById(projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/projects/" + projectId;
    return firstValueFrom(this.http.get<ProjectObject>(url, { headers }));
  }

  createProject(projectName: string): Promise<void> {
    const createProjectRequest: CreateProjectRequest = {
      name: projectName
    }

    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/projects"
    return firstValueFrom(this.http.post<void>(url, createProjectRequest, { headers }));
  }

  updateProjectName(project: UpdateProjectRequest, projectId: string): Promise<ProjectObject> {
    const accessToken = localStorage.getItem("access-token")

    const headers = new HttpHeaders({
      'Authorization': "Bearer " + accessToken,
      'Content-Type': 'application/json'
    });

    const url = "http://localhost:8080/api/projects/" + projectId; 
    return firstValueFrom(this.http.put<ProjectObject>(url, project, { headers }));
  }
}

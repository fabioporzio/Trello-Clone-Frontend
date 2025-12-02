export interface ProjectObject {
  id: string; 
  name: string;
  phases: string[];
  owner: string;
  team: string[];
}

export interface CreateProjectRequest {
  name: string;
}

export interface UpdateProjectRequest {
  name: string | undefined;
  phases: string[] | undefined;
  team: string[] | undefined;
}
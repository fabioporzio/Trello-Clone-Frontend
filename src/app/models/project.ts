export interface ProjectObject {
  id: string; 
  name: string;
  phases: string[];
  owner: string;
  team: string[];
  invitedUsers: string[];
}

export interface CreateProjectRequest {
  name: string;
}

export interface UpdateProjectRequest {
  name?: string;
  phases?: string[];
  owner?: string;
  team?: string[];
  invitedUsers?: string[];
}
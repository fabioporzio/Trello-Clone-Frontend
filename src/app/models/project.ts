interface ProjectObject {
  id: string; 
  name: string;
  phases: string[];
  owner: string;
  team: string[];
}

interface CreateProjectRequest {
  name: string;
}

interface UpdateProjectRequest {
  name: string | undefined;
  phases: string[] | undefined;
  team: string[] | undefined;
}
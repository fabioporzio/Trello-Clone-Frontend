export interface CreateTaskRequest {
  title: string;           
  description: string;     
  phase: string;           
  tags?: string[];         
  assignees?: string[];    
  endDate?: string;        
  projectId: string; 
}

export interface Task {
  id: string;             
  title: string;
  description: string;
  phase: string;
  tags?: string[];        
  assignees?: string[];   
  endDate?: string;       
  projectId: string; 
}

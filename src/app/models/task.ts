export interface CreateTaskRequest {
  title: string;           
  description: string;     
  phase: string;           
  tags?: string[];         
  assignees?: string[];    
  endDate?: string;        
  projectId: string; 
}

export interface TaskObject {
  id: string;             
  title: string;
  description: string;
  phase: string;
  tags?: string[];        
  assignees?: string[];   
  endDate?: string;       
  projectId: string; 
}

export interface UpdateTaskRequest {
  title?: string;          
  description?: string;    
  phase?: string;          
  tag?: string;         
  assignees?: string;    
  endDate?: string;      
}


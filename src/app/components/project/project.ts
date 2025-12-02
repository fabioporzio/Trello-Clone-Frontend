import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project-service/project-service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-project',
  imports: [FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  editing: boolean = false;
  displayNewPhaseButton: Boolean = true;

  project: Partial<ProjectObject> = {};
  async ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get("id");

    this.project = await this.projectService.getProjectById(projectId!);
    console.log(this.project)
  }

  startEditing() {
    this.editing = true;
    // optional: focus automatico sull'input
    setTimeout(() => {
      const input = document.querySelector<HTMLInputElement>('.title-input');
      input?.focus();
      input?.select();
    }, 0);
  }

  async stopEditing() {
    this.editing = false;

    const updateProjectRequest: UpdateProjectRequest = {
      name: this.project.name,
      phases: this.project.phases,
      team: this.project.team
    }

    this.project = await this.projectService.updateProjectName(updateProjectRequest, this.project.id!);
  }

  async addPhase(form: NgForm) {
    const { newPhase } = form.value;

    this.project.phases?.push(newPhase);

    const updateProjectRequest: UpdateProjectRequest = {
      name: this.project.name,
      phases: this.project.phases,
      team: this.project.team
    }

    this.project = await this.projectService.addPhase(updateProjectRequest, this.project.id!);
    this.displayNewPhaseButton = true;
  }
}

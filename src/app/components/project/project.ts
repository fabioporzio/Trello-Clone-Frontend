import { Component, computed, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service/project-service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { NgModel } from '@angular/forms';

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
  displayNewTeamMemberButton = true;


  searchText = '';
  search = signal('');
  selectedUser = signal<string | null>(null);
  users: User[] = [];


  filteredUsers = computed(() =>
    this.users.filter(
      u =>
        u.email.toLowerCase().includes(this.search().toLowerCase()) &&
        !this.project.team?.includes(u.email)
    )
  );

  onSearchChange(value: string) {
    this.searchText = value;
    this.search.set(value);
    this.selectedUser.set(null);
  }

  selectUser(email: string) {
    this.selectedUser.set(email);
    this.searchText = email;
    this.search.set('');
  }

  async addTeamMember() {
    const user = this.selectedUser();

    if (user) {
      this.project.team?.push(user);
      this.resetInput();
    }

    const updateProjectRequest: UpdateProjectRequest = {
      name: this.project.name,
      phases: this.project.phases,
      team: this.project.team
    }

    this.project = await this.projectService.addMember(updateProjectRequest, this.project.id!);
    this.displayNewTeamMemberButton = true;
  }

  private resetInput() {
    this.searchText = '';
    this.search.set('');
    this.selectedUser.set(null);
    this.displayNewTeamMemberButton = true;
  }

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

  async loadUsers() {
    this.users = await this.projectService.loadUsers()
    this.displayNewTeamMemberButton = false;
  }
}

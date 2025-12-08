import { Component, computed, inject, signal } from '@angular/core';
import { ProjectService } from '../../services/project-service/project-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { TaskService } from '../../services/task-service/task-service';
import { CreateTaskRequest, TaskMap, TaskObject } from '../../models/task';
import { UserService } from '../../services/user-service';
import { ProjectObject, UpdateProjectRequest } from '../../models/project';

@Component({
  selector: 'app-project',
  imports: [FormsModule, RouterLink],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly userService = inject(UserService);
  private readonly taskService = inject(TaskService);

  editing: boolean = false;
  displayNewPhaseButton: Boolean = true;
  displayNewTeamMemberButton: Boolean = true;
  displayAddTaksButton: Boolean = true;

  user: Partial<User> = {};
  deleteProjectError: string = "";
  tasks: TaskMap = {};

  project: Partial<ProjectObject> = {};
  async ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get("id");

    this.project = await this.projectService.getProjectById(projectId!);
    console.log(this.project)

    this.tasks = await this.taskService.getTasksByProjectId(projectId!)
    console.log(this.tasks)

    this.user = await this.userService.getUser();
    console.log(this.user)
  }

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

  startEditing() {
    this.editing = true;

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

  async addTask(form: NgForm) {
    const { taskTitle, taskDescription, taskPhase } = form.value;

    const createTaskRequest: CreateTaskRequest = {
      title: taskTitle,
      description: taskDescription,
      phase: taskPhase,
      projectId: this.project.id!
    }

    const newtask: TaskObject = await this.taskService.addTask(createTaskRequest);
    console.log(newtask)
    this.displayAddTaksButton = true;

  }

  async loadUsers() {
    this.users = await this.projectService.loadUsers()
    this.displayNewTeamMemberButton = false;
  }

  async leaveProject() {
    if (this.user.email !== this.project.owner) {

      this.project.team = this.project.team?.filter(teamMember => teamMember !== this.user.email);

      const updateProjectRequest: UpdateProjectRequest = {
        name: this.project.name,
        phases: this.project.phases,
        team: this.project.team
      }

      this.project = await this.projectService.deleteMember(updateProjectRequest, this.project.id!)
      await this.router.navigate(["/home"])
    }
  }

  async deleteProject() {
    if (this.user.email === this.project.owner) {
      this.project = await this.projectService.deleteProject(this.project.id!)
      await this.router.navigate(["/home"])
    }
  }
}

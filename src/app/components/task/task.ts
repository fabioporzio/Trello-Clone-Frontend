import { Component, computed, inject, signal } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { ActivatedRoute } from '@angular/router';
import { TaskObject, UpdateTaskRequest } from '../../models/task';
import { ProjectService } from '../../services/project-service/project-service';
import { ProjectObject } from '../../models/project';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-task',
  imports: [FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  private readonly taskService = inject(TaskService);
  private readonly projectService = inject(ProjectService)
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);

  displayNewAssigneesButton: Boolean = true;
  searchText = '';
  search = signal('');
  selectedUser = signal<string | null>(null);
  users: string[] = [];

  task: Partial<TaskObject> = {};
  project: Partial<ProjectObject> = {}
  user: Partial<User> = {};
  async ngOnInit() {
    this.user = await this.userService.getUser();

    const taskId = this.route.snapshot.paramMap.get("id");
    this.task = await this.taskService.getTaskById(taskId!);
    console.log(this.task.assignees)

    this.project = await this.projectService.getProjectById(this.task.projectId!)
    console.log(this.project)
  }

  async changePhase(form: NgForm) {
    if (!this.task.assignees || this.task.assignees.length === 0 || this.task.assignees.includes(this.user.email!)) {
      const { taskPhase } = form.value;
      console.log(taskPhase)

      const updateTaskRequest: UpdateTaskRequest = {
        phase: taskPhase
      }

      this.task = await this.taskService.updateTaskPhase(updateTaskRequest, this.task.id!)
      console.log(this.task)
    }
  }

  async updateTask(form: NgForm) {
    if (!this.task.assignees || this.task.assignees.length === 0 || this.task.assignees.includes(this.user.email!)) {
      const { newTitle, newDescription, newTag } = form.value;
      console.log(newTitle)
      console.log(newDescription)
      console.log(newTag)

      const updateTaskRequest: UpdateTaskRequest = {
        title: newTitle,
        description: newDescription,
        tag: newTag
      }

      this.task = await this.taskService.updateTask(updateTaskRequest, this.task.id!)
      console.log(this.task)
    }
  }

  async loadUsers() {
    this.users = this.project.team!;
    this.displayNewAssigneesButton = false;
  }

  filteredUsers = computed(() =>
    this.users.filter(
      u =>
        u.toLowerCase().includes(this.search().toLowerCase())
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

      if (!this.task.assignees) {
        this.task.assignees = [];
      }

      this.task.assignees.push(user);
      this.resetInput();
    }

    console.log(this.task.assignees)

    const updateTaskRequest: UpdateTaskRequest = {
      assignees: this.task.assignees
    }

    this.project = await this.taskService.updateTask(updateTaskRequest, this.task.id!);
    this.displayNewAssigneesButton = true;
  }

  private resetInput() {
    this.searchText = '';
    this.search.set('');
    this.selectedUser.set(null);
    this.displayNewAssigneesButton = true;
  }

}

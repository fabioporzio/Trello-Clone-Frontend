import { Component, inject } from '@angular/core';
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

  task: Partial<TaskObject> = {};
  project: Partial<ProjectObject> = {}
  user: Partial<User> = {};
  async ngOnInit() {
    this.user = await this.userService.getUser();

    const taskId = this.route.snapshot.paramMap.get("id");
    this.task = await this.taskService.getTaskById(taskId!);

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
}

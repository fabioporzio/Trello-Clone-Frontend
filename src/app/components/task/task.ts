import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task-service/task-service';
import { ActivatedRoute } from '@angular/router';
import { TaskObject } from '../../models/task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);

  task: Partial<TaskObject> = {};
  async ngOnInit() {
    const taskId = this.route.snapshot.paramMap.get("id");
    this.task = await this.taskService.getTaskById(taskId!);
  }
}

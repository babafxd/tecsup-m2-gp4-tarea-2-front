import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
    tasks$!: Observable<Task[]>;

    constructor(private taskService: TaskService) { }

    ngOnInit(): void {
        this.loadTasks();
    }

    loadTasks(): void {
        this.tasks$ = this.taskService.getTasks();
    }

    deleteTask(id: number): void {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            this.taskService.deleteTask(id).subscribe({
                next: () => {
                    this.loadTasks();
                },
                error: (e) => console.error(e)
            });
        }
    }
}

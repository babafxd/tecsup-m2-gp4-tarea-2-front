import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
    selector: 'app-task-form',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './task-form.component.html',
    styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
    task: Task = {
        titulo: '',
        completado: false
    };
    isEditMode = false;

    constructor(
        private taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.taskService.getTask(+id).subscribe({
                next: (data) => this.task = data,
                error: (e) => console.error(e)
            });
        }
    }

    saveTask(): void {
        if (this.isEditMode) {
            this.taskService.updateTask(this.task.id!, this.task).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (e) => console.error(e)
            });
        } else {
            this.taskService.createTask(this.task).subscribe({
                next: () => this.router.navigate(['/tasks']),
                error: (e) => console.error(e)
            });
        }
    }
}

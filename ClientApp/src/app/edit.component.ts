import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Task } from './classes/task';
import { TaskStatus } from './classes/taskStatus'

@Component({
    selector: 'app-edit-modal',
    templateUrl: './edit.component.html'
})
export class EditModal implements OnInit {
    constructor(public modal: NgbActiveModal) { }
    task: Task;
    statuses: TaskStatus[];
    editedTask: Task;
    statusIndex: number;

    ngOnInit() {
        this.editedTask = new Task();
        Object.assign(this.editedTask, this.task);
        this.statusIndex = this.task.taskStatus.id - 1;
        this.editedTask.completionDate = this.editedTask.completionDate.slice(0, 19);
    }
}
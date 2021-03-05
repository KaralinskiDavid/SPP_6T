import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Task } from './classes/task';
import { TaskStatus } from './classes/taskStatus'

@Component({
    selector: 'app-create-modal',
    templateUrl: './create.component.html'
})
export class CreateModal implements OnInit {
    constructor(public modal: NgbActiveModal) { }
    statuses: TaskStatus[];
    createdTask: Task;
    statusIndex: number;

    ngOnInit() {
        this.createdTask = new Task();
        this.createdTask.name = '';
        this.statusIndex = 0;
    }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { Task } from './classes/task';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete.component.html'
})
export class DeleteModal implements OnInit{
    constructor(public modal: NgbActiveModal) {

    }

    task: Task;
    ngOnInit() {

    }
}
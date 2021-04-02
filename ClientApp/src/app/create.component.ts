import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { Task } from './classes/task';
import { TaskStatus } from './classes/taskStatus'
import { FileService } from './services/file.service';

@Component({
    selector: 'app-create-modal',
    templateUrl: './create.component.html',
    providers: [FileService]
})
export class CreateModal implements OnInit {
    constructor(public modal: NgbActiveModal, private _fileService: FileService, public toastr: ToastrService) { }
    statuses: TaskStatus[];
    createdTask: Task;
    addedFiles: any[] = new Array();
    statusIndex: number;


    onFileSelect(event) {

        console.log(event);
        event.addedFiles.forEach((item) => {
            //if (this.task.files.find((function (value) {
            //    return value.name = item.name;
            //})))
            //    item.name += "1";
            this.addedFiles.push(item);
        });
    }

    onFileRemove(event) {
        console.log(event);
        this.addedFiles = this.addedFiles.filter((value) => value.name != event.name);
    }

    ngOnInit() {
        this.createdTask = new Task();
        this.createdTask.name = '';
        this.statusIndex = 0;
    }
}
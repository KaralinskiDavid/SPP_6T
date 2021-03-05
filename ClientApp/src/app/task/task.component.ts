import { Component, Output, Input, EventEmitter } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FileService } from '../services/file.service';
import { DeleteModal } from '../delete.component';
import { EditModal } from '../edit.component';
import { Task } from '../classes/task';
import { TaskStatus } from '../classes/taskStatus';
import { File } from '../classes/file';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'task-comp',
    templateUrl: './task.component.html',
    providers:[FileService]
})
export class TaskComponent {
    constructor(private _modalService: NgbModal, private _fileService:FileService, public toastr: ToastrService) { }

    ALLOW_FILE_EXT = '.pdf, .jpeg, .jpg, .png, .doc, .docx, .xls, .xlsx';
    ALLOW_FILE_SIZE = 10000000;

    onDeleteClicked() {
        const modalRef = this._modalService.open(DeleteModal);
        modalRef.componentInstance.task = this.task;
        modalRef.result.then((result) => {
            if (result == "Ok")
                this.delete(this.task.id);
        });
    }

    onEditClicked() {
        const modalRef = this._modalService.open(EditModal);
        modalRef.componentInstance.task = this.task;
        modalRef.componentInstance.statuses = this.statuses;
        modalRef.result.then((result) => {
            if (result == "Ok") {
                var editedTask = modalRef.componentInstance.editedTask;
                editedTask.taskStatus = this.statuses[modalRef.componentInstance.statusIndex];
                this.update(editedTask);
            };
        });
    }

    @Input() task: Task;
    @Input() statuses: TaskStatus[];
    getBgColor(statusId: number) {
        return bgColors[statusId];
    }

    @Output() onDelete = new EventEmitter<number>();
    delete(id: number) {
        this.onDelete.emit(id);
    }

    @Output() onEdit = new EventEmitter<Task>();
    update(task: Task) {
        this.onEdit.emit(task);
    }

    onFileSelect(event) {

        console.log(event);
        event.addedFiles.forEach((item) => {
            //if (this.task.files.find((function (value) {
            //    return value.name = item.name;
            //})))
            //    item.name += "1";
            const formData = new FormData();
            formData.append("uploadedFile", item);
            this._fileService.uploadFile(formData, item.name, this.task.id).subscribe((response: any) => {
                this.task.files.push(response);
                console.log(response);
                this.toastr.success('File saved');
            },
                error => {
                    console.log(error);
                    this.toastr.error('Something went wrong');
                }
            );
        });
    }

    onFileRemove(event: File) {

        console.log(event);

        if (event.id) {
            this._fileService.deleteFile(event.id).subscribe((response: any) => {
                console.log(response);
                this.task.files = this.task.files.filter(function (value) {
                    return value.name != event.name;
                }
                );
                this.toastr.success('File removed');
            },
                error => {
                    console.log(error);
                    this.toastr.error('Something went wrong');
                }
            );
        }
    }

    onFileItemClick(file: File) {
        event.preventDefault();
        event.stopPropagation();
        this.downloadDocument(file);
    }

    downloadDocument(file: File) {

        this._fileService.downloadFile(file.id).subscribe((response: any) => {
            if (response.byteLength > 0) {
                let a = document.createElement("a");
                document.body.appendChild(a);
                //a.style = "display: none";
                let blob = new Blob([response]);
                let url = URL.createObjectURL(blob);
                //window.open(fileURL);
                a.href = url;
                a.download = file.name;
                a.click();
                //window.URL.revokeObjectURL(url);
            } else {
                alert('Что-то пошло не так');
            }
            console.log(response);
        },
            error => {
                console.log(error);
                alert('Что-то пошло не так');
            }
        );
    }


}

enum bgColors { indigo = 1, red, cyan, teal, gray }
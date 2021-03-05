var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { FileService } from './file.service';
import { DeleteModal } from './delete.component';
import { EditModal } from './edit.component';
let TaskComponent = class TaskComponent {
    constructor(_modalService, _fileService) {
        this._modalService = _modalService;
        this._fileService = _fileService;
        this.ALLOW_FILE_EXT = '.pdf, .jpeg, .jpg, .png, .doc, .docx, .xls, .xlsx';
        this.ALLOW_FILE_SIZE = 10000000;
        this.onDelete = new EventEmitter();
        this.onEdit = new EventEmitter();
    }
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
            }
            ;
        });
    }
    getBgColor(statusId) {
        return bgColors[statusId];
    }
    delete(id) {
        this.onDelete.emit(id);
    }
    update(task) {
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
            this._fileService.uploadFile(formData, item.name, this.task.id).subscribe((response) => {
                this.task.files.push(response);
                console.log(response);
            }, error => {
                console.log(error);
            });
        });
    }
    onFileRemove(event) {
        console.log(event);
        if (event.id) {
            this._fileService.deleteFile(event.id).subscribe((response) => {
                console.log(response);
                this.task.files = this.task.files.filter(function (value) {
                    return value.name != event.name;
                });
            }, error => {
                console.log(error);
            });
        }
    }
    onFileItemClick(file) {
        event.preventDefault();
        event.stopPropagation();
        this.downloadDocument(file);
    }
    downloadDocument(file) {
        this._fileService.downloadFile(file.id).subscribe((response) => {
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
            }
            else {
                alert('Что-то пошло не так');
            }
            console.log(response);
        }, error => {
            console.log(error);
            alert('Что-то пошло не так');
        });
    }
};
__decorate([
    Input()
], TaskComponent.prototype, "task", void 0);
__decorate([
    Input()
], TaskComponent.prototype, "statuses", void 0);
__decorate([
    Output()
], TaskComponent.prototype, "onDelete", void 0);
__decorate([
    Output()
], TaskComponent.prototype, "onEdit", void 0);
TaskComponent = __decorate([
    Component({
        selector: 'task-comp',
        templateUrl: './task.component.html',
        providers: [FileService]
    })
], TaskComponent);
export { TaskComponent };
var bgColors;
(function (bgColors) {
    bgColors[bgColors["indigo"] = 1] = "indigo";
    bgColors[bgColors["red"] = 2] = "red";
    bgColors[bgColors["cyan"] = 3] = "cyan";
    bgColors[bgColors["teal"] = 4] = "teal";
    bgColors[bgColors["gray"] = 5] = "gray";
})(bgColors || (bgColors = {}));
//# sourceMappingURL=task.component.js.map
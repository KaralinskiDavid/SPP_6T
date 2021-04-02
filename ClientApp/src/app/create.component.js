var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Task } from './classes/task';
import { FileService } from './services/file.service';
let CreateModal = class CreateModal {
    constructor(modal, _fileService, toastr) {
        this.modal = modal;
        this._fileService = _fileService;
        this.toastr = toastr;
        this.addedFiles = new Array();
    }
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
};
CreateModal = __decorate([
    Component({
        selector: 'app-create-modal',
        templateUrl: './create.component.html',
        providers: [FileService]
    })
], CreateModal);
export { CreateModal };
//# sourceMappingURL=create.component.js.map
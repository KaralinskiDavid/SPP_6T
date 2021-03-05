var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { Task } from './classes/task';
let EditModal = class EditModal {
    constructor(modal) {
        this.modal = modal;
    }
    ngOnInit() {
        this.editedTask = new Task();
        Object.assign(this.editedTask, this.task);
        this.statusIndex = this.task.taskStatus.id - 1;
        this.editedTask.completionDate = this.editedTask.completionDate.slice(0, 19);
    }
};
EditModal = __decorate([
    Component({
        selector: 'app-edit-modal',
        templateUrl: './edit.component.html'
    })
], EditModal);
export { EditModal };
//# sourceMappingURL=edit.component.js.map
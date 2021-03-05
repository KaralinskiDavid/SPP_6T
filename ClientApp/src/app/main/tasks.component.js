var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { CreateModal } from '../create.component';
import { TaskService } from '../services/task.service';
let TasksComponent = class TasksComponent {
    constructor(dataService, toastr, _modalService) {
        this.dataService = dataService;
        this.toastr = toastr;
        this._modalService = _modalService;
        this.ascending = true;
        this.tasks = null;
        this.filteredTasks = null;
        this.filtering = null;
        this.statuses = null;
        this.displayedTasks = null;
        this.isFilterDisabled = true;
        this.pagesArr = null;
        this.currentPage = 1;
        this.isByStatusCollapsed = true;
        this.isByDateCollapsed = true;
    }
    loadTasks() {
        this.dataService.getTasks().subscribe((data) => {
            this.tasks = data;
            this.filteredTasks = new Array(this.tasks.length);
            Object.assign(this.filteredTasks, this.tasks);
            this.loadStatuses();
        }, error => {
            console.log(error);
            this.toastr.error('Something went wrong');
        });
    }
    loadStatuses() {
        this.dataService.getTaskStatuses().subscribe((data) => {
            this.statuses = data;
            this.filtering = new Array(this.statuses.length).fill(true);
            this.filterByStatus(this.filtering);
        }, error => {
            console.log(error);
            this.toastr.error('Something went wrong');
        });
    }
    ngOnInit() {
        this.loadTasks();
    }
    filterByStatus(filtering) {
        this.filteredTasks = this.tasks.filter(function (value) {
            return filtering[value.taskStatus.id - 1];
        });
        this.displayedTasks = this.filteredTasks.slice(0, 3);
        this.pagesArr = new Array(this.getPagesCount()).fill(1);
        this.filterByDate(this.ascending);
    }
    getPagesCount() {
        return Number.isInteger(this.filteredTasks.length / 3) ? this.filteredTasks.length / 3 : Math.trunc(this.filteredTasks.length / 3) + 1;
    }
    moveToPage(pageNumber) {
        var end = this.filteredTasks.length - 1 >= (pageNumber - 1) * 3 + 2 ? (pageNumber - 1) * 3 + 2 : this.filteredTasks.length - 1;
        this.displayedTasks = this.filteredTasks.slice((pageNumber - 1) * 3, end + 1);
        this.currentPage = pageNumber;
    }
    filterByDate(asc) {
        this.ascending = asc;
        if (asc)
            this.filteredTasks = this.filteredTasks.sort(this.sortAscendig);
        else
            this.filteredTasks = this.filteredTasks.sort(this.sortDescending);
        if (this.getPagesCount() < this.currentPage)
            this.currentPage = this.getPagesCount();
        this.moveToPage(this.currentPage);
    }
    sortAscendig(a, b) {
        if (new Date(a.completionDate.slice(0, 19)) < new Date(b.completionDate.slice(0, 19)))
            return 1;
        else if (new Date(a.completionDate.slice(0, 19)) > new Date(b.completionDate.slice(0, 19)))
            return -1;
        return 0;
    }
    sortDescending(a, b) {
        if (new Date(a.completionDate.slice(0, 19)) > new Date(b.completionDate.slice(0, 19)))
            return 1;
        else if (new Date(a.completionDate.slice(0, 19)) < new Date(b.completionDate.slice(0, 19)))
            return -1;
        return 0;
    }
    deleteTask(id) {
        this.dataService.deleteTask(id).subscribe((response) => {
            this.tasks = this.tasks.filter(function (value) {
                return value.id != id;
            });
            this.filterByStatus(this.filtering);
            this.toastr.success("Deleted successfull");
        }, error => {
            console.log(error);
            this.toastr.error('Something went wrong');
        });
    }
    updateTask(task) {
        this.dataService.updateTask(task).subscribe(result => {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == task.id) {
                    this.tasks[i] = task;
                    break;
                }
            }
            this.filterByStatus(this.filtering);
            this.toastr.success("Edited successfull");
        }, error => {
            console.log(error);
            this.toastr.error('Something went wrong');
        });
    }
    onCreateClicked() {
        const modalRef = this._modalService.open(CreateModal);
        modalRef.componentInstance.statuses = this.statuses;
        modalRef.result.then((result) => {
            if (result == "Ok") {
                var createdTask = modalRef.componentInstance.createdTask;
                createdTask.taskStatus = this.statuses[modalRef.componentInstance.statusIndex];
                this.createTask(createdTask);
            }
            ;
        });
    }
    createTask(task) {
        this.dataService.createTask(task).subscribe((result) => {
            result.taskStatus = this.statuses.find(function (value) {
                return value.id = result.taskStatusId;
            });
            this.tasks.push(result);
            this.filterByStatus(this.filtering);
            this.toastr.success("Created successfull");
        }, error => {
            console.log(error);
            this.toastr.error('Something went wrong');
        });
    }
};
TasksComponent = __decorate([
    Component({
        selector: 'tasks',
        templateUrl: './tasks.component.html',
        providers: [TaskService]
    })
], TasksComponent);
export { TasksComponent };
//# sourceMappingURL=tasks.component.js.map
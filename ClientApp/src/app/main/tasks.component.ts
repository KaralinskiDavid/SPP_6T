import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr';
import { CreateModal } from '../create.component';
import { TaskService } from '../services/task.service';
import { Task } from '../classes/task';
import { TaskStatus } from '../classes/taskStatus';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../services/file.service';

@Component({
    selector: 'tasks',
    templateUrl: './tasks.component.html',
    providers: [TaskService, FileService]
})

export class TasksComponent implements OnInit{
    tasks: Task[];
    filteredTasks: Task[];
    displayedTasks: Task[];
    statuses: TaskStatus[];
    filtering: boolean[];
    isFilterDisabled: boolean;
    pagesArr: number[];
    currentPage: number;
    isByStatusCollapsed: boolean;
    isByDateCollapsed: boolean;
    ascending = true;


    constructor(private dataService: TaskService, private toastr: ToastrService, private _modalService: NgbModal, private _fileService: FileService) {
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
        this.dataService.getTasks().subscribe((data: Task[]) => {
            this.tasks = data;
            this.filteredTasks = new Array(this.tasks.length);
            Object.assign(this.filteredTasks, this.tasks);
            this.loadStatuses();
        },
            error => {
                console.log(error);
                this.toastr.error('Something went wrong');
            }
        );
    }

    loadStatuses() {
        this.dataService.getTaskStatuses().subscribe((data: TaskStatus[]) => {
            this.statuses = data;
            this.filtering = new Array(this.statuses.length).fill(true);
            this.filterByStatus(this.filtering);
        },
            error => {
                console.log(error);
                this.toastr.error('Something went wrong');
            }
        );
    }

    getStatusesCallback(result, caller) {
        caller.statuses = result;
        caller.filtering = new Array(caller.statuses.length).fill(true);
        caller.filterByStatus(caller.filtering);
    }

    getTasksCallback(result, caller) {
        caller.tasks = result;
        caller.filteredTasks = new Array(caller.tasks.length);
        Object.assign(caller.filteredTasks, caller.tasks);
        caller.dataService.getTaskSatusesHub(caller.getStatusesCallback, caller);
    }

    ngOnInit() {
        this.dataService.getTasksHub(this.getTasksCallback, this);
    }


    filterByStatus(filtering:boolean[]) {
        this.filteredTasks = this.tasks.filter(function (value){
            return filtering[value.taskStatus.id-1];
        });
        this.displayedTasks = this.filteredTasks.slice(0, 3);
        this.pagesArr = new Array(this.getPagesCount()).fill(1); 
        this.filterByDate(this.ascending);
    }

    getPagesCount() {
        return Number.isInteger(this.filteredTasks.length / 3) ? this.filteredTasks.length / 3 : Math.trunc(this.filteredTasks.length / 3)+1;
    }

    moveToPage(pageNumber: number) {
        var end = this.filteredTasks.length - 1 >= (pageNumber - 1) * 3 + 2 ? (pageNumber - 1) * 3 + 2 : this.filteredTasks.length - 1;
        this.displayedTasks = this.filteredTasks.slice((pageNumber - 1) * 3, end + 1);
        this.currentPage = pageNumber;
    }

    filterByDate(asc: boolean) {
        this.ascending = asc;
        if (asc)
            this.filteredTasks = this.filteredTasks.sort(this.sortAscendig);
        else
            this.filteredTasks = this.filteredTasks.sort(this.sortDescending);
        if (this.getPagesCount() < this.currentPage)
            this.currentPage = this.getPagesCount();
        this.moveToPage(this.currentPage);
    }

    sortAscendig(a: Task, b: Task) {
        if (new Date(a.completionDate?.slice(0,19)) < new Date(b.completionDate?.slice(0,19)))
            return 1;
        else if (new Date(a.completionDate?.slice(0,19)) > new Date(b.completionDate?.slice(0,19)))
            return -1;
        return 0;
    }

    sortDescending(a: Task, b: Task) {
        if (new Date(a.completionDate?.slice(0, 19)) > new Date(b.completionDate?.slice(0, 19)))
            return 1;
        else if (new Date(a.completionDate?.slice(0, 19)) < new Date(b.completionDate?.slice(0, 19)))
            return -1;
        return 0;
    }

    deleteTask(id: number) {
        this.dataService.deleteTask(id).subscribe((response: any) => {
            this.tasks = this.tasks.filter(function (value) {
                return value.id != id;
            });
            this.filterByStatus(this.filtering);
            this.toastr.success("Deleted successfull");
        },
            error => {
                console.log(error);
                this.toastr.error('Something went wrong');
            }
        );
    }

    deleteTaskCallback(id, result, caller) {
        if (!result) {
            caller.toastr.error("Something went wrong");
            return;
        }
        caller.tasks = caller.tasks.filter(function (value) {
            return value.id != id;
        });
        caller.filterByStatus(caller.filtering);
        caller.toastr.success("Deleted successfull");
    }

    deleteTaskHub(id: number) {
        this.dataService.deleteTaskHub(id, this.deleteTaskCallback, this);
    }

    updateTask(task: Task) {
        this.dataService.updateTask(task).subscribe(result => {
            for (let i = 0; i < this.tasks.length; i++) {
                if (this.tasks[i].id == task.id) {
                    this.tasks[i] = task;
                    break;
                }
            }
            this.filterByStatus(this.filtering);
            this.toastr.success("Edited successfull");
        },
            error => {
                console.log(error);
                this.toastr.error('Something went wrong');
            }
        );
    }

    updateTaskCallBack(task: Task, result, caller) {
        if (result == null) {
            caller.toastr.error("Something went wrong");
            return;
        }
        for (let i = 0; i < caller.tasks.length; i++) {
            if (caller.tasks[i].id == task.id) {
                caller.tasks[i] = task;
                break;
            }
        }
        caller.filterByStatus(caller.filtering);
        caller.toastr.success("Edited successfull");
    }

    updateTaskHub(task: Task) {
        this.dataService.updateTaskHub(task, this.updateTaskCallBack, this);
    }

    onCreateClicked() {
        const modalRef = this._modalService.open(CreateModal);
        modalRef.componentInstance.statuses = this.statuses;
        modalRef.result.then((result) => {
            if (result == "Ok") {
                var createdTask = modalRef.componentInstance.createdTask;
                createdTask.taskStatus = this.statuses[modalRef.componentInstance.statusIndex];
                //this.createTaskHub(createdTask);
                this.createTask(createdTask, modalRef.componentInstance.addedFiles);
            };
        });
    }

    createTask(task: Task, files: []) {
        this.dataService.createTask(task).subscribe((result: any) => {
            result.taskStatus = this.statuses.find(function (value) {
                return value.id = result.taskStatusId;
            });
            files.forEach((item: any) => {
                const formData = new FormData();
                formData.append("uploadedFile", item);
                this._fileService.uploadFile(formData, item.name, result.id).subscribe((response: any) => {
                    if (!result.files)
                        result.files = new Array();
                    result.files.push(response);
                    console.log(response);
                    this.toastr.success('File saved');
                },
                    error => {
                        console.log(error);
                        this.toastr.error('Something went wrong');
                    }
                );
            });
            this.tasks.push(result);
            this.filterByStatus(this.filtering);
            this.toastr.success("Created successfull");
        },
            error => {
                console.log(error);
                this.toastr.error('Something went wrong');
            }
        );
    }

    createTaskCallback(task: Task, result, caller) {
        if (result == null) {
            caller.toastr.error("Something went wrong");
            return;
        }
        result.taskStatus = caller.statuses.find(function (value) {
            return value.id = result.taskStatusId;
        });
        caller.tasks.push(result);
        caller.filterByStatus(caller.filtering);
        caller.toastr.success("Created successfull");
    }

    createTaskHub(task: Task) {
        this.dataService.createTaskHub(task, this.createTaskCallback, this);
    }

}
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { LoginModalComponent } from '../modals/login.modal.component';
let TaskService = class TaskService {
    constructor(_modalService, cookieService, http) {
        this._modalService = _modalService;
        this.cookieService = cookieService;
        this.http = http;
        this.url = "/api/tasks";
        this.connected = false;
    }
    connectToHub() {
        try {
            this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/tasksHub', {
                accessTokenFactory: () => this.cookieService.get('access_token'),
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets
            }).build();
            return this.hubConnection.start().catch((reason) => {
                console.log(reason);
                this.cookieService.remove("access_token");
                this.cookieService.remove("userName");
                this._modalService.open(LoginModalComponent);
            });
            this.hubConnection.onclose((error) => error ? console.log(error) : console.log(closed));
        }
        catch (error) {
            console.log(error);
        }
    }
    disconnect() {
        try {
            return this.hubConnection.stop().then(() => this.connected = false).catch((reason) => console.log(reason));
        }
        catch (error) {
            console.log(error);
        }
    }
    getTasksHub(callback, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on('GetTasks', (data) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(data, caller));
                });
                this.hubConnection.invoke('GetTasks').catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    getTasks() {
        return this.http.get(this.url);
    }
    getTask(id) {
        return this.http.get(this.url + '/' + id);
    }
    getTaskStatuses() {
        return this.http.get(this.url + '/statuses');
    }
    getTaskSatusesHub(callback, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on('GetStatuses', (data) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(data, caller));
                });
                this.hubConnection.invoke('GetStatuses').catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    deleteTask(id) {
        return this.http.delete(this.url + '/' + id);
    }
    deleteTaskHub(id, callback, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on("DeleteTask", (result) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(id, result, caller));
                });
                this.hubConnection.invoke("DeleteTask", id).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    updateTask(task) {
        let model = {
            name: task.name,
            completionDate: task.completionDate,
            description: task.description,
            taskStatusId: task.taskStatus.id
        };
        return this.http.put(this.url + '/' + task.id, model);
    }
    updateTaskHub(task, callback, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on("UpdateTask", (result) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(task, result, caller));
                });
                let model = {
                    name: task.name,
                    completionDate: task.completionDate,
                    description: task.description,
                    taskStatusId: task.taskStatus.id
                };
                this.hubConnection.invoke("UpdateTask", model, task.id).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    createTask(task) {
        let model = {
            name: task.name,
            completionDate: new Date(task.completionDate),
            description: task.description,
            taskStatusId: task.taskStatus.id
        };
        return this.http.post(this.url, model);
    }
    createTaskHub(task, callback, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on("CreateTask", (result) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(task, result, caller));
                });
                let model = {
                    name: task.name,
                    completionDate: new Date(task.completionDate),
                    description: task.description,
                    taskStatusId: task.taskStatus.id
                };
                this.hubConnection.invoke("CreateTask", model).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
TaskService = __decorate([
    Injectable()
], TaskService);
export { TaskService };
//# sourceMappingURL=task.service.js.map
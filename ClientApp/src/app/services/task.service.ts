import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../classes/task';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { error } from '@angular/compiler/src/util';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modals/login.modal.component';
import { CookieService } from './cookie.service';
import { connected } from 'process';

@Injectable()
export class TaskService {

    private hubConnection: HubConnection;
    private url = "/api/tasks";
    public connected = false;

    constructor(private _modalService: NgbModal, private cookieService: CookieService, private http: HttpClient) {
    }

    private connectToHub() {
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

    private disconnect() {
        try {
            return this.hubConnection.stop().then(() => this.connected = false).catch((reason)=>console.log(reason));
        }
        catch (error) {
            console.log(error);
        }
    }

    getTasksHub(callback: (result, caller) => any, caller: any) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on('GetTasks', (data) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(data, caller));
                }
                );
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

    getTask(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    getTaskStatuses() {
        return this.http.get(this.url + '/statuses')
    }

    getTaskSatusesHub(callback: (result, caller) => any, caller: any) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on('GetStatuses', (data) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(data, caller));
                }
                );
                this.hubConnection.invoke('GetStatuses').catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    deleteTask(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    deleteTaskHub(id: number, callback: (id, result, caller) => any, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on("DeleteTask", (result: boolean) => {
                    this.disconnect().catch((error) => console.log(error)).then(() => callback(id, result, caller));
                });
                this.hubConnection.invoke("DeleteTask", id).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    updateTask(task: Task) {
        let model = {
            name: task.name,
            completionDate: task.completionDate,
            description: task.description,
            taskStatusId: task.taskStatus.id
        }
        return this.http.put(this.url +'/' + task.id, model);
    }

    updateTaskHub(task: Task, callback: (task, result, caller) => any, caller) {
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
                }
                this.hubConnection.invoke("UpdateTask", model, task.id).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }

    createTask(task: Task) {
        let model = {
            name: task.name,
            completionDate: new Date(task.completionDate),
            description: task.description,
            taskStatusId: task.taskStatus.id
        }
        return this.http.post(this.url, model);
    }

    createTaskHub(task: Task, callback: (task: Task, result, caller) => any, caller) {
        try {
            this.connectToHub().catch((error) => console.log(error)).then(() => {
                this.hubConnection.on("CreateTask", (result) => {
                    this.disconnect().catch((error)=>console.log(error)).then(() => callback(task, result, caller));
                });
                let model = {
                    name: task.name,
                    completionDate: new Date(task.completionDate),
                    description: task.description,
                    taskStatusId: task.taskStatus.id
                }
                this.hubConnection.invoke("CreateTask", model).catch((error) => console.log(error));
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}

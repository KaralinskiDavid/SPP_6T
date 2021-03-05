var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
let TaskService = class TaskService {
    constructor(http) {
        this.http = http;
        this.url = "/api/tasks";
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
    deleteTask(id) {
        return this.http.delete(this.url + '/' + id);
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
    createTask(task) {
        let model = {
            name: task.name,
            completionDate: new Date(task.completionDate),
            description: task.description,
            taskStatusId: task.taskStatus.id
        };
        return this.http.post(this.url, model);
    }
};
TaskService = __decorate([
    Injectable()
], TaskService);
export { TaskService };
//# sourceMappingURL=task.service.js.map
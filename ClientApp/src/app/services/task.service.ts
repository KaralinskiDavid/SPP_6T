import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../classes/task';

@Injectable()
export class TaskService {
    private url = "/api/tasks";

    constructor(private http: HttpClient) {}

    getTasks() {
        return this.http.get(this.url);
    }

    getTask(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    getTaskStatuses() {
        return this.http.get(this.url + '/statuses')
    }

    deleteTask(id: number) {
        return this.http.delete(this.url + '/' + id);
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

    createTask(task: Task) {
        let model = {
            name: task.name,
            completionDate: new Date(task.completionDate),
            description: task.description,
            taskStatusId: task.taskStatus.id
        }
        return this.http.post(this.url, model);
    }
}

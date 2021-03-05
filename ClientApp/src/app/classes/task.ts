import { File } from "./file";
import { TaskStatus } from "./taskStatus";

export class Task {
    public id: number;
    public name: string;
    public completionDate: string;
    public description: string;
    public taskStatus: TaskStatus;
    public files: File[];
}
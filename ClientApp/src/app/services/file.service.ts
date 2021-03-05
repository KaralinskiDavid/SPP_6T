import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../classes/file';

@Injectable()
export class FileService {
    private url = "/api/files";

    constructor(private http: HttpClient) { }

    uploadFile(data: FormData, name: string, taskModelId: number) {
        return this.http.post(this.url + '/?name=' + name + '&taskModelId=' + taskModelId, data);
    }

    deleteFile(id) {
        return this.http.delete(this.url + '/' + id);
    }

    downloadFile(id) {
        return this.http.get(this.url + '/' + id, { responseType: 'arraybuffer' });
    }
}

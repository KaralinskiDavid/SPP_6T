import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../classes/file';
import { Account } from '../classes/account';

@Injectable()
export class AuthService {
    private url = "/api/auth";

    constructor(private http: HttpClient) { }

    checkUserName(username: string) {
        return this.http.get(this.url + '/checkName/' + username);
    }

    signIn(email: string, password: string) {
        const user = { email: email, password: password };
        return this.http.post(this.url + '/login', user);
    }

    signUp(user : Account) {
        return this.http.post(this.url + '/register', user);
    }

}

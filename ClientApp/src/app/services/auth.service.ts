import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '../classes/file';
import { Account } from '../classes/account';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';


@Injectable()
export class AuthService {

    private hubConnection: HubConnection;
    private url = "/api/auth";

    constructor(private http: HttpClient) {
        this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/authHub', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).build();
        this.hubConnection.start();
    }

    checkUserName(username: string) {
        return this.http.get(this.url + '/checkName/' + username);
    }

    checkUserNameHub(username: string, callback: (boolean, any) => any, that) {
        this.hubConnection.on("CheckName", (result: boolean) => {
            callback(result, that);
            this.hubConnection.off("CheckName");
        });
        this.hubConnection.invoke("CheckName", username);
    }

    signIn(email: string, password: string) {
        const user = { email: email, password: password };
        return this.http.post(this.url + '/login', user);
    }

    signInHub(email: string, password: string, callback: (result, caller)=>any, caller: any) {
        this.hubConnection.on("Login", (result) => {
            callback(result, caller);
            this.hubConnection.off("Login");
        });
        const user = { email: email, password: password };
        this.hubConnection.invoke("Login", user);
    }

    signUp(user : Account) {
        return this.http.post(this.url + '/register', user);
    }

    signUpHub(user: Account, callback: (boolean) => any) {
        this.hubConnection.on("Register", (result: boolean) => {
            callback(result);
            this.hubConnection.off("Register");
        });
        this.hubConnection.invoke("Register", user);
    }

}

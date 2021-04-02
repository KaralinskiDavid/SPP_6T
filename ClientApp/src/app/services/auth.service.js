var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.url = "/api/auth";
        this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/authHub', {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets
        }).build();
        this.hubConnection.start();
    }
    checkUserName(username) {
        return this.http.get(this.url + '/checkName/' + username);
    }
    checkUserNameHub(username, callback, that) {
        this.hubConnection.on("CheckName", (result) => {
            callback(result, that);
            this.hubConnection.off("CheckName");
        });
        this.hubConnection.invoke("CheckName", username);
    }
    signIn(email, password) {
        const user = { email: email, password: password };
        return this.http.post(this.url + '/login', user);
    }
    signInHub(email, password, callback, caller) {
        this.hubConnection.on("Login", (result) => {
            callback(result, caller);
            this.hubConnection.off("Login");
        });
        const user = { email: email, password: password };
        this.hubConnection.invoke("Login", user);
    }
    signUp(user) {
        return this.http.post(this.url + '/register', user);
    }
    signUpHub(user, callback) {
        this.hubConnection.on("Register", (result) => {
            callback(result);
            this.hubConnection.off("Register");
        });
        this.hubConnection.invoke("Register", user);
    }
};
AuthService = __decorate([
    Injectable()
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
let CookieService = class CookieService {
    constructor() {
        this.cookieStore = {};
        this.parseCookies(document.cookie);
    }
    parseCookies(cookies = document.cookie) {
        this.cookieStore = {};
        if (!!cookies === false) {
            return;
        }
        const cookiesArr = cookies.split(';');
        for (const cookie of cookiesArr) {
            const cookieArr = cookie.split('=');
            this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
        }
    }
    get(key) {
        this.parseCookies();
        return !!this.cookieStore[key] ? this.cookieStore[key] : null;
    }
    remove(key) {
        document.cookie = `${key} = ; expires=Thu, 1 jan 1990 12:00:00 UTC; path=/`;
    }
    set(key, value) {
        document.cookie = key + '=' + (value || '');
    }
};
CookieService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], CookieService);
export { CookieService };
//# sourceMappingURL=cookie.service.js.map
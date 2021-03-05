var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
let JWTTokenService = class JWTTokenService {
    constructor() {
    }
    setToken(token) {
        if (token) {
            this.jwtToken = token;
        }
    }
    decodeToken() {
        if (this.jwtToken) {
            this.decodedToken = jwt_decode(this.jwtToken);
        }
    }
    getDecodeToken() {
        return jwt_decode(this.jwtToken);
    }
    getUser() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.displayname : null;
    }
    getEmailId() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.email : null;
    }
    getExpiryTime() {
        this.decodeToken();
        return this.decodedToken ? this.decodedToken.exp : null;
    }
    isTokenExpired() {
        const expiryTime = this.getExpiryTime();
        if (expiryTime) {
            return ((1000 * +expiryTime) - (new Date()).getTime()) < 5000;
        }
        else {
            return false;
        }
    }
};
JWTTokenService = __decorate([
    Injectable()
], JWTTokenService);
export { JWTTokenService };
//# sourceMappingURL=jwt-token.service.js.map
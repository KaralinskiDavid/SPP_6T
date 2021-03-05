var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
let LoginGuard = class LoginGuard {
    constructor(router, cookieService) {
        this.router = router;
        this.cookieService = cookieService;
    }
    canActivate(next, state) {
        const token = this.cookieService.get('access_token');
        if (!token) {
            return true;
        }
        else {
            if (!jwtHelper.isTokenExpired(token)) {
                this.router.navigate(['/tasks']);
                return false;
            }
            else {
                this.cookieService.remove("access_token");
                this.cookieService.remove("userName");
                return true;
            }
        }
    }
};
LoginGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoginGuard);
export { LoginGuard };
//# sourceMappingURL=login.guard.js.map
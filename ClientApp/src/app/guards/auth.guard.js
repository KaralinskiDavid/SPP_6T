var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
let AuthorizeGuard = class AuthorizeGuard {
    constructor(router, cookieService) {
        this.router = router;
        this.cookieService = cookieService;
    }
    canActivate(next, state) {
        let token = this.cookieService.get('access_token');
        if (token) {
            if (jwtHelper.isTokenExpired(token)) {
                this.cookieService.remove("access_token");
                this.cookieService.remove("userName");
                this.router.navigate(['/login']);
                return false;
            }
            else {
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
};
AuthorizeGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthorizeGuard);
export { AuthorizeGuard };
//# sourceMappingURL=auth.guard.js.map
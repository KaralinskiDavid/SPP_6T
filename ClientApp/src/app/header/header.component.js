var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { CookieService } from '../services/cookie.service';
let HeaderComponent = class HeaderComponent {
    constructor(cookieService, router) {
        this.cookieService = cookieService;
        this.router = router;
    }
    logOut() {
        this.cookieService.remove('access_token');
        this.cookieService.remove('userName');
        this.router.navigate(['/login']);
    }
    ngOnInit() {
        this.userName = this.cookieService.get('userName') ? this.cookieService.get('userName') : null;
    }
};
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        providers: [CookieService]
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map
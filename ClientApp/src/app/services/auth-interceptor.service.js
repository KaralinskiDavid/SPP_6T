var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginModalComponent } from '../modals/login.modal.component';
let AuthInterceptor = class AuthInterceptor {
    constructor(_modalService, cookieService, router) {
        this._modalService = _modalService;
        this.cookieService = cookieService;
        this.router = router;
    }
    intercept(req, next) {
        const token = this.cookieService.get('access_token');
        req = req.clone({
            url: req.url,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(req).pipe(catchError((error) => {
            if (error) {
                switch (error.status) {
                    case 401:
                        if (this.router.url != '/login') {
                            this.cookieService.remove("access_token");
                            this.cookieService.remove("userName");
                            this._modalService.open(LoginModalComponent);
                        }
                    default:
                        return Observable.throw(error);
                }
            }
            else {
                return Observable.throw(error);
            }
        }));
    }
};
AuthInterceptor = __decorate([
    Injectable()
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth-interceptor.service.js.map
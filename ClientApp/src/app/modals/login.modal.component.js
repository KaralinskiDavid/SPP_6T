var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';
const jwtHelper = new JwtHelperService();
let LoginModalComponent = class LoginModalComponent {
    constructor(_authService, _cookieService, toastr, modal, router) {
        this._authService = _authService;
        this._cookieService = _cookieService;
        this.toastr = toastr;
        this.modal = modal;
        this.router = router;
        this.email = '';
        this.password = '';
        this.loginForm = new FormGroup({
            "email": new FormControl("", [
                Validators.required,
                Validators.email
            ]),
            "password": new FormControl("", Validators.required)
        });
    }
    tryLogin() {
        this._authService.signIn(this.email, this.password).subscribe((result) => {
            if (result.access_token) {
                this._cookieService.set('access_token', result.access_token);
                this._cookieService.set('userName', jwtHelper.decodeToken(result.access_token).given_name);
                this.modal.close();
            }
        }, error => {
            this.modal.close();
            console.log(error);
            this.toastr.error('Wrong email or password');
        });
    }
    logOut() {
        this._cookieService.remove("access_token");
        this._cookieService.remove("userName");
        this.router.navigate(['/login']);
        this.modal.close();
    }
    ngOnInit() {
    }
};
LoginModalComponent = __decorate([
    Component({
        selector: 'app-login-modal-component',
        templateUrl: './login.modal.component.html',
        providers: [AuthService, CookieService]
    })
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=login.modal.component.js.map
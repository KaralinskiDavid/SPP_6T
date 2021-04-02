var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from '../classes/account';
import { AuthService } from '../services/auth.service';
let RegisterComponent = class RegisterComponent {
    constructor(_authService, router, toastr) {
        this._authService = _authService;
        this.router = router;
        this.toastr = toastr;
        this.duplicateName = false;
        this.user = new Account();
        this.registerForm = new FormGroup({
            "name": new FormControl("", Validators.required),
            "email": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
            "confirmPassword": new FormControl("", [Validators.required, Validators.minLength(6)])
        });
    }
    tryRegister() {
        this._authService.signUp(this.user).subscribe((result) => {
            this.toastr.success('Registered');
            this.router.navigate(['/login']);
        }, error => {
            console.log(error);
            this.toastr.error("User with this email is already registered");
        });
    }
    tryRegisterHub() {
        this._authService.signUpHub(this.user, this.registerCallback);
    }
    registerCallback(result) {
        if (!result) {
            this.toastr.error("User with this email is already registered");
            return;
        }
        this.toastr.success('Registered');
        this.router.navigate(['/login']);
    }
    checkName() {
        this._authService.checkUserName(this.user.userName).subscribe((result) => {
            this.duplicateName = !result;
        });
    }
    checkNameHub() {
        this._authService.checkUserNameHub(this.user.userName, this.checkNameCallback, this);
    }
    checkNameCallback(result, that) {
        that.duplicateName = !result;
    }
    ngOnInit() {
        //this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/authHub', {
        //    skipNegotiation: true,
        //    transport: HttpTransportType.WebSockets
        //}).build();
        //this.hubConnection.start();
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register-component',
        templateUrl: './register.component.html',
        providers: [AuthService]
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map
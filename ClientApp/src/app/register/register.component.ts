import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../classes/account';
import { AuthService } from '../services/auth.service';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    providers: [AuthService]
})
export class RegisterComponent implements OnInit {

    user: Account;
    registerForm: FormGroup;
    duplicateName = false;
    hubConnection: HubConnection;

    tryRegister() {
        this._authService.signUp(this.user).subscribe((result:any) => {
            this.toastr.success('Registered');
            this.router.navigate(['/login']);
        },
            error => {
                console.log(error);
                this.toastr.error("User with this email is already registered");
            }
        );
    }

    tryRegisterHub() {
        this._authService.signUpHub(this.user, this.registerCallback);
    }

    registerCallback(result: boolean) {
        if (!result) {
            this.toastr.error("User with this email is already registered");
            return;
        }
        this.toastr.success('Registered');
        this.router.navigate(['/login']);
    }

    checkName() {
        this._authService.checkUserName(this.user.userName).subscribe((result: boolean) => {
            this.duplicateName = !result;
        });
    }

    checkNameHub() {
        this._authService.checkUserNameHub(this.user.userName, this.checkNameCallback, this);
    }

    checkNameCallback(result: boolean, that) {
        that.duplicateName = !result;
    }

    constructor(private _authService: AuthService, public router: Router, public toastr: ToastrService) {
        this.user = new Account();
        this.registerForm = new FormGroup({
            "name": new FormControl("", Validators.required),
            "email": new FormControl("", [Validators.required, Validators.email]),
            "password": new FormControl("", [Validators.required, Validators.minLength(6)]),
            "confirmPassword": new FormControl("", [Validators.required, Validators.minLength(6)])
        });
    }

    ngOnInit() {
        //this.hubConnection = new HubConnectionBuilder().withUrl('https://localhost:5001/authHub', {
        //    skipNegotiation: true,
        //    transport: HttpTransportType.WebSockets
        //}).build();
        //this.hubConnection.start();
    }
}
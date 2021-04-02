import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    providers: [AuthService, CookieService]
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    loginForm: FormGroup;
    hubConnection: HubConnection;
    jwtHelper = new JwtHelperService();


    tryLogin() {
        this._authService.signIn(this.email, this.password).subscribe((result: any) => {
            if (result.access_token) {
                this._cookieService.set('access_token', result.access_token);
                this._cookieService.set('userName', this.jwtHelper.decodeToken(result.access_token).given_name);
                this.router.navigate(['/tasks']);
            }
        },
            error => {
                console.log(error);
                this.toastr.error('Wrong email or password');
            }
        );
    }

    tryLoginHub() {
        this._authService.signInHub(this.email, this.password, this.tryLoginCallback, this);
    }

    tryLoginCallback(result, that) {
        if (result == null) {
            that.toastr.error("Wrong email or password");
            return;
        }
        that._cookieService.set('access_token', result);
        that._cookieService.set('userName', that.jwtHelper.decodeToken(result).given_name);
        that.router.navigate(['/tasks']);
    }

    constructor(private _authService: AuthService, private _cookieService: CookieService,
        private toastr: ToastrService, public router: Router) {
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
    ngOnInit() {
    }
}
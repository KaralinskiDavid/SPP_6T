import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

const jwtHelper = new JwtHelperService();

@Component({
    selector: 'app-login-component',
    templateUrl: './login.component.html',
    providers: [AuthService, CookieService]
})
export class LoginComponent implements OnInit {

    email: string;
    password: string;
    loginForm: FormGroup;



    tryLogin() {
        this._authService.signIn(this.email, this.password).subscribe((result: any) => {
            if (result.access_token) {
                this._cookieService.set('access_token', result.access_token);
                this._cookieService.set('userName', jwtHelper.decodeToken(result.access_token).given_name);
                this.router.navigate(['/tasks']);
            }
        },
            error => {
                console.log(error);
                this.toastr.error('Wrong email or password');
            }
        );
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
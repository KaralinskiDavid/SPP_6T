import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Component({
    selector: 'app-login-modal-component',
    templateUrl: './login.modal.component.html',
    providers: [AuthService, CookieService]
})
export class LoginModalComponent implements OnInit {

    email: string;
    password: string;
    loginForm: FormGroup;



    tryLogin() {
        this._authService.signIn(this.email, this.password).subscribe((result: any) => {
            if (result.access_token) {
                this._cookieService.set('access_token', result.access_token);
                this._cookieService.set('userName', jwtHelper.decodeToken(result.access_token).given_name);
                this.modal.close();
            }
        },
            error => {
                this.modal.close();
                console.log(error);
                this.toastr.error('Wrong email or password');
            }
        );
    }

    logOut() {
        this._cookieService.remove("access_token");
        this._cookieService.remove("userName");
        this.router.navigate(['/login']);
        this.modal.close();
    }

    constructor(private _authService: AuthService, private _cookieService: CookieService,
        private toastr: ToastrService, public modal: NgbActiveModal, private router: Router) {
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
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../classes/account';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register-component',
    templateUrl: './register.component.html',
    providers: [AuthService]
})
export class RegisterComponent implements OnInit {

    user: Account;
    registerForm: FormGroup;
    duplicateName = false;

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

    checkName() {
        this._authService.checkUserName(this.user.userName).subscribe((result: boolean) => {
            this.duplicateName = !result;
        });
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

    }
}
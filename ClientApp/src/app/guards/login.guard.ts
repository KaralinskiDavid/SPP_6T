import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(private router: Router,
        private cookieService: CookieService) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
        const token = this.cookieService.get('access_token');
        if (!token) {
            return true;
        }
        else {
            if (!jwtHelper.isTokenExpired(token)) {
                this.router.navigate(['/tasks']);
                return false;
            } else {
                this.cookieService.remove("access_token");
                this.cookieService.remove("userName");
                return true;
            }
        }
    }
}
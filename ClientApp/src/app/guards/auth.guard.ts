import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

const jwtHelper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {
    constructor(private router: Router,
        private cookieService: CookieService) {
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
        let token = this.cookieService.get('access_token');
        if (token) {
            if (jwtHelper.isTokenExpired(token)) {
                this.cookieService.remove("access_token");
                this.cookieService.remove("userName");
                this.router.navigate(['/login']);
                return false;
            } else {
                return true;
            }
        }
        this.router.navigate(['/login']);
        return false;
    }
}
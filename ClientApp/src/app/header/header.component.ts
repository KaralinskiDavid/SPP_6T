import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from '../services/cookie.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    providers: [CookieService]
})

export class HeaderComponent implements OnInit {
    userName: string;
    constructor(private cookieService: CookieService, public router: Router) { }

    logOut() {
        this.cookieService.remove('access_token');
        this.cookieService.remove('userName');
        this.router.navigate(['/login']);
    }

    ngOnInit() {
        this.userName = this.cookieService.get('userName') ? this.cookieService.get('userName') : null;
    }
}
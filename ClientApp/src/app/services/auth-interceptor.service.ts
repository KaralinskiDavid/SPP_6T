import { Injectable, Inject, Optional } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CookieService } from './cookie.service';
import { Observable } from 'rxjs';
import { catchError, map, tap, finalize, switchMap, filter, take } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modals/login.modal.component';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _modalService: NgbModal, private cookieService: CookieService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.cookieService.get('access_token');
        req = req.clone({
            url: req.url,
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error) {
                    switch (error.status) {
                        case 401:
                            if (this.router.url != '/login') {
                                this.cookieService.remove("access_token");
                                this.cookieService.remove("userName");
                                this._modalService.open(LoginModalComponent);
                            }
                        default:
                            return Observable.throw(error);
                    }
                } else {
                    return Observable.throw(error);
                }

            })) as Observable<HttpEvent<any>>;
    }
}
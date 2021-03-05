var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TasksComponent } from './main/tasks.component';
import { TaskComponent } from './task/task.component';
import { DeleteModal } from './delete.component';
import { EditModal } from './edit.component';
import { CreateModal } from './create.component';
import { LoginModalComponent } from './modals/login.modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizeGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { JwtModule } from '@auth0/angular-jwt';
const appRoutes = [
    {
        path: 'tasks',
        component: TasksComponent,
        canActivate: [AuthorizeGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard]
    },
    {
        path: "register",
        component: RegisterComponent,
        canActivate: [LoginGuard]
    }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [BrowserModule,
            BrowserAnimationsModule,
            FormsModule,
            HttpClientModule,
            NgbModule,
            JwtModule,
            NgxDropzoneModule,
            RouterModule.forRoot(appRoutes, { enableTracing: true }),
            ToastrModule.forRoot({ "closeButton": false, "enableHtml": true, "timeOut": 5000, positionClass: 'toast-bottom-right', }),
            ReactiveFormsModule
        ],
        declarations: [AppComponent, HeaderComponent, TaskComponent, DeleteModal, EditModal, CreateModal,
            TasksComponent, LoginComponent, RegisterComponent, LoginModalComponent],
        providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map
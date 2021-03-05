import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
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
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorizeGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
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


@NgModule({
    imports: [BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        NgbModule,
        JwtModule,
        NgxDropzoneModule,
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true }
        ),
        ToastrModule.forRoot({ "closeButton": false, "enableHtml": true, "timeOut": 5000, positionClass: 'toast-bottom-right', }),
        ReactiveFormsModule
    ], 
    declarations: [AppComponent, HeaderComponent, TaskComponent, DeleteModal, EditModal, CreateModal,
        TasksComponent, LoginComponent, RegisterComponent, LoginModalComponent],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
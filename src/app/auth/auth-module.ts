import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signup } from './signup/signup';
import { Login } from './login/login';
import { AuthRoutingModule } from './auth-routing-module';
import { AuthComponent } from './auth-component/auth-component'


@NgModule({
  declarations: [
    Signup,
    Login,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

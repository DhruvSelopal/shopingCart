import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Signup } from './signup/signup';
import { Login } from './login/login';



@NgModule({
  declarations: [
    Signup,
    Login
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }

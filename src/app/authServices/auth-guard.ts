import { Injectable } from '@angular/core';
import { AuthService } from './AuthService';
import { CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private authservice : AuthService,private router : Router){}

  canActivate(): boolean | UrlTree{
    if(this.authservice.IsLoggedIn()) return true;
    else return this.router.createUrlTree(['/auth'])
  }
}

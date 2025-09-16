import { Injectable } from '@angular/core';
import { AuthService } from './authServices/AuthService';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private authservice:AuthService){}
  checkUserName(){
    return this.authservice.IsLoggedIn()
  }
}
